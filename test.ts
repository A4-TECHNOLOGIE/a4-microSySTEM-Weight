// Compilation coverage for the complete public API.
//
// These functions are intentionally not called. This allows test.ts to compile
// every block and the LCD dependency while the MakeCode simulator runs without
// physical I2C hardware. The documented hardware tests and pass/fail criteria
// are available in TESTING.md.

function compileScaleApi(): void {
    lcdDisplay.lcdInitIIC()
    lcdDisplay.lcdClearAll()
    lcdDisplay.lcdSetBgcolor(0x000000)

    a4MicroSystemWeight.initializeScale()
    a4MicroSystemWeight.tareScale()

    const measuredMass = Math.round(a4MicroSystemWeight.massGrams())
    const connected = a4MicroSystemWeight.scaleConnected()

    lcdDisplay.lcdDisplayText("TEST BALANCE", 1, 55, 25, lcdDisplay.FontSize.Large, 0xffffff)
    lcdDisplay.lcdDisplayText("Masse : " + measuredMass + " g", 2, 55, 110, lcdDisplay.FontSize.Large, 0x00ffff)
    serial.writeValue("connected", connected ? 1 : 0)
}

function compileCalibrationApi(): void {
    a4MicroSystemWeight.startCalibration()
    const calibrationOk = a4MicroSystemWeight.finishCalibration(100)

    a4MicroSystemWeight.setCalibrationFactor(2236)
    const factor = a4MicroSystemWeight.getCalibrationFactor()
    const rawValue = a4MicroSystemWeight.rawAverage(5)

    serial.writeValue("calibration_ok", calibrationOk ? 1 : 0)
    serial.writeValue("factor", factor)
    serial.writeValue("raw", rawValue)
}

function compileKeypadApi(): void {
    a4MicroSystemWeight.initializeKeypad()

    const pressedKey = a4MicroSystemWeight.pressedKey()
    const waitedKey = a4MicroSystemWeight.waitForKey()
    const keyPressed = a4MicroSystemWeight.keyIsPressed(
        a4MicroSystemWeight.WeightKey.One
    )

    serial.writeLine(pressedKey)
    serial.writeLine(waitedKey)
    serial.writeValue("key_1", keyPressed ? 1 : 0)
}
