input.onButtonPressed(Button.A, function () {
    if (!(calibrationMode)) {
        a4MicroSystemWeight.tareScale()
    }
})

input.onButtonPressed(Button.B, function () {
    if (calibrationMode) return

    calibrationMode = true
    lcdDisplay.lcdClearAll()
    lcdDisplay.lcdSetBgcolor(0x000000)
    lcdDisplay.lcdDisplayText("ETALONNAGE", 1, 50, 25, lcdDisplay.FontSize.Large, 0xffff00)
    lcdDisplay.lcdDisplayText("Retirer toute masse", 2, 50, 85, lcdDisplay.FontSize.Small, 0xffffff)
    lcdDisplay.lcdDisplayText("Patientez...", 3, 80, 140, lcdDisplay.FontSize.Small, 0x00ffff)

    a4MicroSystemWeight.startCalibration()

    lcdDisplay.lcdClearAll()
    lcdDisplay.lcdDisplayText("ETALONNAGE", 1, 50, 25, lcdDisplay.FontSize.Large, 0xffff00)
    lcdDisplay.lcdDisplayText("Poser la masse", 2, 70, 80, lcdDisplay.FontSize.Small, 0xffffff)
    lcdDisplay.lcdDisplayText("etalon de 100 g", 3, 65, 115, lcdDisplay.FontSize.Small, 0xffffff)
    lcdDisplay.lcdDisplayText("Ne plus toucher", 4, 65, 165, lcdDisplay.FontSize.Small, 0xff9900)
    basic.pause(5000)

    lcdDisplay.lcdClearAll()
    lcdDisplay.lcdDisplayText("MESURE...", 1, 75, 80, lcdDisplay.FontSize.Large, 0x00ffff)

    calibrationOk = a4MicroSystemWeight.finishCalibration(100)

    lcdDisplay.lcdClearAll()
    if (calibrationOk) {
        lcdDisplay.lcdDisplayText("ETALONNAGE OK", 1, 40, 65, lcdDisplay.FontSize.Large, 0x00ff00)
        lcdDisplay.lcdDisplayText("Facteur : " + Math.round(a4MicroSystemWeight.getCalibrationFactor()), 2, 65, 125, lcdDisplay.FontSize.Small, 0xffffff)
        lcdDisplay.lcdDisplayText("Retirer la masse", 3, 60, 170, lcdDisplay.FontSize.Small, 0xffffff)
    } else {
        lcdDisplay.lcdDisplayText("ECHEC", 1, 95, 65, lcdDisplay.FontSize.Large, 0xff0000)
        lcdDisplay.lcdDisplayText("Recommencer", 2, 80, 125, lcdDisplay.FontSize.Small, 0xffffff)
    }

    basic.pause(3000)
    showHomeScreen()
    calibrationMode = false
})

function showHomeScreen () {
    lcdDisplay.lcdClearAll()
    lcdDisplay.lcdSetBgcolor(0x000000)
    lcdDisplay.lcdDisplayText("TEST ETALONNAGE", 1, 30, 20, lcdDisplay.FontSize.Large, 0xffffff)
    lcdDisplay.lcdDisplayText("A : tare", 3, 35, 185, lcdDisplay.FontSize.Small, 0xffffff)
    lcdDisplay.lcdDisplayText("B : etalonner 100 g", 4, 140, 185, lcdDisplay.FontSize.Small, 0xffffff)
}

let measuredMass = 0
let calibrationOk = false
let calibrationMode = false

lcdDisplay.lcdInitIIC()
lcdDisplay.lcdClearAll()
a4MicroSystemWeight.initializeScale()
showHomeScreen()

basic.forever(function () {
    if (!(calibrationMode)) {
        measuredMass = Math.round(a4MicroSystemWeight.massGrams())
        lcdDisplay.lcdDisplayText("Masse : " + measuredMass + " g", 2, 55, 105, lcdDisplay.FontSize.Large, 0x00ffff)
    }
    basic.pause(250)
})
