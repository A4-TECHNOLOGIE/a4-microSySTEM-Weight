//% weight=100 color=#F2B705 icon="\uf24e" block="a4 microSySTEM Weight"
//% groups='["Scale", "4x4 keypad", "Advanced"]'
namespace a4MicroSystemWeight {
    const hx711Address = 0x64
    const regClearState = 0x65
    const regRawData = 0x66
    const regInitialize = 0x70
    const regTare = 0x73

    const defaultCalibrationFactor = 2236
    const defaultSampleCount = 12

    let scaleInitialized = false
    let scaleOffset = 0
    let calibrationFactor = defaultCalibrationFactor
    let calibrationEmptyRaw = 0
    let calibrationStarted = false

    let keypadInitialized = false

    export enum WeightKey {
        //% block="1"
        One,
        //% block="2"
        Two,
        //% block="3"
        Three,
        //% block="A"
        A,
        //% block="4"
        Four,
        //% block="5"
        Five,
        //% block="6"
        Six,
        //% block="B"
        B,
        //% block="7"
        Seven,
        //% block="8"
        Eight,
        //% block="9"
        Nine,
        //% block="C"
        C,
        //% block="*"
        Star,
        //% block="0"
        Zero,
        //% block="#"
        Hash,
        //% block="D"
        D
    }

    function writeRegister(registerAddress: number, value: number): void {
        const buffer = pins.createBuffer(2)
        buffer[0] = registerAddress
        buffer[1] = value
        pins.i2cWriteBuffer(hx711Address, buffer)
        basic.pause(30)
    }

    function readRegister(registerAddress: number, length: number): Buffer {
        const registerBuffer = pins.createBuffer(1)
        registerBuffer[0] = registerAddress
        pins.i2cWriteBuffer(hx711Address, registerBuffer)
        basic.pause(22)
        return pins.i2cReadBuffer(hx711Address, length)
    }

    function readRawInternal(): number {
        const data = readRegister(regRawData, 4)

        if (data.length < 4 || data[0] != 0x12) return -1

        let value = data[1] * 65536 + data[2] * 256 + data[3]
        return value ^ 0x800000
    }

    function readRawAverageInternal(samples: number): number {
        samples = Math.clamp(1, 50, Math.round(samples))

        let sum = 0
        let validSamples = 0
        let attempts = 0
        const maximumAttempts = samples * 4

        while (validSamples < samples && attempts < maximumAttempts) {
            const value = readRawInternal()
            attempts++

            if (value >= 0) {
                sum += value
                validSamples++
            }

            basic.pause(20)
        }

        if (validSamples == 0) return -1
        return sum / validSamples
    }

    function ensureScaleInitialized(): void {
        if (!scaleInitialized) initializeScale()
    }

    /**
     * Initializes the I2C weighing module and records the empty scale value.
     */
    //% blockId=a4_weight_initialize_scale
    //% help=github:a4-microsystem-weight/docs/initialize-scale
    //% block="initialize scale"
    //% weight=100
    //% group="Scale"
    export function initializeScale(): void {
        writeRegister(regInitialize, regClearState)
        basic.pause(250)

        for (let index = 0; index < 5; index++) {
            readRawInternal()
            basic.pause(30)
        }

        const initialValue = readRawAverageInternal(15)
        if (initialValue >= 0) {
            scaleOffset = initialValue
            scaleInitialized = true
        } else {
            scaleInitialized = false
        }
    }

    /**
     * Sets the current load on the scale to zero.
     */
    //% blockId=a4_weight_tare_scale
    //% help=github:a4-microsystem-weight/docs/tare-scale
    //% block="tare scale"
    //% weight=90
    //% group="Scale"
    export function tareScale(): void {
        ensureScaleInitialized()

        const valueBeforeReset = readRawAverageInternal(12)
        if (valueBeforeReset >= 0) scaleOffset = valueBeforeReset

        writeRegister(regTare, 0)
        basic.pause(500)

        for (let index = 0; index < 5; index++) {
            readRawInternal()
            basic.pause(30)
        }

        const stableValue = readRawAverageInternal(20)
        if (stableValue >= 0) {
            scaleOffset = stableValue
            scaleInitialized = true
        }
    }

    /**
     * Reads the measured mass in grams.
     */
    //% blockId=a4_weight_mass_grams
    //% help=github:a4-microsystem-weight/docs/mass-grams
    //% block="mass (g)"
    //% weight=80
    //% group="Scale"
    export function massGrams(): number {
        ensureScaleInitialized()

        const rawValue = readRawAverageInternal(defaultSampleCount)
        if (rawValue < 0 || calibrationFactor <= 0) return 0

        const mass = (rawValue - scaleOffset) / calibrationFactor

        if (Math.abs(mass) < 0.5) return 0
        if (Math.abs(mass) > 5000) return 0

        return mass
    }

    /**
     * Returns true when valid data can be read from the weighing module.
     */
    //% blockId=a4_weight_scale_connected
    //% help=github:a4-microsystem-weight/docs/scale-connected
    //% block="scale connected"
    //% weight=70
    //% group="Scale"
    export function scaleConnected(): boolean {
        ensureScaleInitialized()
        return readRawInternal() >= 0
    }

    /**
     * Records the empty scale value and starts a two-step calibration.
     */
    //% blockId=a4_weight_start_calibration
    //% help=github:a4-microsystem-weight/docs/start-calibration
    //% block="start scale calibration"
    //% weight=60
    //% group="Scale"
    export function startCalibration(): void {
        tareScale()
        calibrationEmptyRaw = scaleOffset
        calibrationStarted = scaleInitialized
    }

    /**
     * Completes calibration using a known reference mass.
     * Returns true when a valid calibration factor has been calculated.
     * @param referenceMass mass of the calibration weight in grams, eg: 100
     */
    //% blockId=a4_weight_finish_calibration
    //% help=github:a4-microsystem-weight/docs/finish-calibration
    //% block="calibrate scale with a reference mass of %referenceMass g"
    //% referenceMass.min=1 referenceMass.max=1000 referenceMass.defl=100
    //% weight=50
    //% group="Scale"
    export function finishCalibration(referenceMass: number): boolean {
        referenceMass = Math.clamp(1, 1000, referenceMass)

        if (!calibrationStarted) return false

        const loadedRaw = readRawAverageInternal(30)
        calibrationStarted = false

        if (loadedRaw < 0) return false

        const calculatedFactor = (loadedRaw - calibrationEmptyRaw) / referenceMass
        if (calculatedFactor <= 0 || calculatedFactor > 1000000) return false

        calibrationFactor = calculatedFactor
        scaleOffset = calibrationEmptyRaw
        return true
    }

    /**
     * Initializes the 4x4 keypad. The micro:bit LED matrix is disabled because P3 is used by the keypad.
     */
    //% blockId=a4_weight_initialize_keypad
    //% help=github:a4-microsystem-weight/docs/initialize-keypad
    //% block="initialize 4x4 keypad"
    //% weight=100
    //% group="4x4 keypad"
    export function initializeKeypad(): void {
        led.enable(false)

        pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P8, PinPullMode.PullUp)

        setAllColumnsHigh()
        keypadInitialized = true
    }

    function ensureKeypadInitialized(): void {
        if (!keypadInitialized) initializeKeypad()
    }

    function setAllColumnsHigh(): void {
        pins.digitalWritePin(DigitalPin.P3, 1)
        pins.digitalWritePin(DigitalPin.P2, 1)
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P0, 1)
    }

    function selectColumn(column: number): void {
        setAllColumnsHigh()

        if (column == 0) pins.digitalWritePin(DigitalPin.P3, 0)
        else if (column == 1) pins.digitalWritePin(DigitalPin.P2, 0)
        else if (column == 2) pins.digitalWritePin(DigitalPin.P1, 0)
        else pins.digitalWritePin(DigitalPin.P0, 0)

        control.waitMicros(200)
    }

    function readRow(): number {
        if (pins.digitalReadPin(DigitalPin.P15) == 0) return 0
        if (pins.digitalReadPin(DigitalPin.P14) == 0) return 1
        if (pins.digitalReadPin(DigitalPin.P13) == 0) return 2
        if (pins.digitalReadPin(DigitalPin.P8) == 0) return 3
        return -1
    }

    function keyAt(row: number, column: number): string {
        const keys = [
            "1", "2", "3", "A",
            "4", "5", "6", "B",
            "7", "8", "9", "C",
            "*", "0", "#", "D"
        ]
        return keys[row * 4 + column]
    }

    function scanKeypad(): string {
        ensureKeypadInitialized()

        for (let column = 0; column < 4; column++) {
            selectColumn(column)
            const row = readRow()

            if (row >= 0) {
                setAllColumnsHigh()
                return keyAt(row, column)
            }
        }

        setAllColumnsHigh()
        return ""
    }

    function keyToText(key: WeightKey): string {
        const keys = [
            "1", "2", "3", "A",
            "4", "5", "6", "B",
            "7", "8", "9", "C",
            "*", "0", "#", "D"
        ]
        return keys[key]
    }

    /**
     * Reads the key currently pressed. Returns an empty string when no key is pressed.
     */
    //% blockId=a4_weight_pressed_key
    //% help=github:a4-microsystem-weight/docs/pressed-key
    //% block="pressed keypad key"
    //% weight=90
    //% group="4x4 keypad"
    export function pressedKey(): string {
        const firstRead = scanKeypad()
        if (firstRead == "") return ""

        basic.pause(50)
        return scanKeypad() == firstRead ? firstRead : ""
    }

    /**
     * Waits for one keypad key press and returns the key after it is released.
     */
    //% blockId=a4_weight_wait_for_key
    //% help=github:a4-microsystem-weight/docs/wait-for-key
    //% block="wait for keypad key"
    //% weight=80
    //% group="4x4 keypad"
    export function waitForKey(): string {
        let key = ""

        while (key == "") {
            key = pressedKey()
            basic.pause(10)
        }

        while (scanKeypad() != "") basic.pause(10)
        return key
    }

    /**
     * Returns true when the selected keypad key is currently pressed.
     * @param key keypad key to test
     */
    //% blockId=a4_weight_key_is_pressed
    //% help=github:a4-microsystem-weight/docs/key-is-pressed
    //% block="keypad key %key is pressed"
    //% weight=70
    //% group="4x4 keypad"
    export function keyIsPressed(key: WeightKey): boolean {
        return pressedKey() == keyToText(key)
    }

    /**
     * Sets the software calibration factor used to convert raw values into grams.
     * @param value calibration factor, eg: 2236
     */
    //% blockId=a4_weight_set_calibration_factor
    //% help=github:a4-microsystem-weight/docs/set-calibration-factor
    //% block="set scale calibration factor to %value"
    //% value.min=1 value.max=100000 value.defl=2236
    //% weight=100
    //% group="Advanced"
    //% advanced=true
    export function setCalibrationFactor(value: number): void {
        if (value > 0) calibrationFactor = value
    }

    /**
     * Returns the calibration factor currently used by the scale.
     */
    //% blockId=a4_weight_get_calibration_factor
    //% help=github:a4-microsystem-weight/docs/get-calibration-factor
    //% block="scale calibration factor"
    //% weight=90
    //% group="Advanced"
    //% advanced=true
    export function getCalibrationFactor(): number {
        return calibrationFactor
    }

    /**
     * Reads the average raw value from the weighing module.
     * @param samples number of valid samples, eg: 10
     */
    //% blockId=a4_weight_raw_average
    //% help=github:a4-microsystem-weight/docs/raw-average
    //% block="average raw scale value with %samples samples"
    //% samples.min=1 samples.max=50 samples.defl=10
    //% weight=80
    //% group="Advanced"
    //% advanced=true
    export function rawAverage(samples: number): number {
        ensureScaleInitialized()
        return readRawAverageInternal(samples)
    }
}
