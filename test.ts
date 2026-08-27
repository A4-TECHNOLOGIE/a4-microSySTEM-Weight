// Compilation smoke tests. The functions are intentionally not called so the
// extension repository can run in the MakeCode simulator without I2C hardware.

function compileMassAndTareDiagnostic(): void {
    lcdDisplay.lcdInitIIC()
    lcdDisplay.lcdClearAll()
    lcdDisplay.lcdSetBgcolor(0x000000)
    lcdDisplay.lcdDisplayText("TEST BALANCE", 1, 55, 25, lcdDisplay.FontSize.Large, 0xffffff)

    a4MicroSystemWeight.initializeScale()
    a4MicroSystemWeight.tareScale()

    const measuredMass = Math.round(a4MicroSystemWeight.massGrams())
    const connected = a4MicroSystemWeight.scaleConnected()
    lcdDisplay.lcdDisplayText("Masse : " + measuredMass + " g", 2, 55, 110, lcdDisplay.FontSize.Large, 0x00ffff)
}

function compileCalibrationDiagnostic(): void {
    a4MicroSystemWeight.startCalibration()
    const calibrationOk = a4MicroSystemWeight.finishCalibration(100)
    a4MicroSystemWeight.setCalibrationFactor(2236)

    const factor = a4MicroSystemWeight.getCalibrationFactor()
    const rawValue = a4MicroSystemWeight.rawAverage(5)
    lcdDisplay.lcdDisplayText("Facteur : " + Math.round(factor), 2, 65, 125, lcdDisplay.FontSize.Small, 0xffffff)
}

function compileKeypadDiagnostic(): void {
    a4MicroSystemWeight.initializeKeypad()

    const pressedKey = a4MicroSystemWeight.pressedKey()
    const waitedKey = a4MicroSystemWeight.waitForKey()
    const keyPressed = a4MicroSystemWeight.keyIsPressed(a4MicroSystemWeight.WeightKey.One)
    lcdDisplay.lcdDisplayText("Touche : " + pressedKey, 3, 75, 130, lcdDisplay.FontSize.Large, 0x00ffff)
}
