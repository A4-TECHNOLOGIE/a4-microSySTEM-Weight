input.onButtonPressed(Button.A, function () {
    lcdDisplay.lcdDisplayText("TARE...", 2, 85, 110, lcdDisplay.FontSize.Large, 0xffff00)
    a4MicroSystemWeight.tareScale()
    lcdDisplay.lcdDisplayText("TARE OK", 2, 75, 110, lcdDisplay.FontSize.Large, 0x00ff00)
    basic.pause(1000)
})

let measuredMass = 0

lcdDisplay.lcdInitIIC()
lcdDisplay.lcdClearAll()
lcdDisplay.lcdSetBgcolor(0x000000)
lcdDisplay.lcdDisplayText("TEST BALANCE", 1, 55, 25, lcdDisplay.FontSize.Large, 0xffffff)
lcdDisplay.lcdDisplayText("Bouton A : tare", 3, 70, 180, lcdDisplay.FontSize.Small, 0xffffff)

a4MicroSystemWeight.initializeScale()

if (a4MicroSystemWeight.scaleConnected()) {
    lcdDisplay.lcdDisplayText("CAPTEUR OK", 4, 90, 70, lcdDisplay.FontSize.Small, 0x00ff00)
} else {
    lcdDisplay.lcdDisplayText("CAPTEUR ABSENT", 4, 70, 70, lcdDisplay.FontSize.Small, 0xff0000)
}

basic.forever(function () {
    measuredMass = Math.round(a4MicroSystemWeight.massGrams())
    lcdDisplay.lcdDisplayText("Masse : " + measuredMass + " g", 2, 55, 110, lcdDisplay.FontSize.Large, 0x00ffff)
    basic.pause(250)
})
