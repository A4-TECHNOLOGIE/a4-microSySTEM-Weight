let pressedKey = ""

lcdDisplay.lcdInitIIC()
lcdDisplay.lcdClearAll()
lcdDisplay.lcdSetBgcolor(0x000000)
lcdDisplay.lcdDisplayText("TEST CLAVIER 4x4", 1, 30, 25, lcdDisplay.FontSize.Large, 0xffffff)
lcdDisplay.lcdDisplayText("Appuyer sur une touche", 2, 40, 80, lcdDisplay.FontSize.Small, 0xffffff)

a4MicroSystemWeight.initializeKeypad()

basic.forever(function () {
    pressedKey = a4MicroSystemWeight.waitForKey()
    lcdDisplay.lcdDisplayText("Touche : " + pressedKey, 3, 75, 130, lcdDisplay.FontSize.Large, 0x00ffff)
})
