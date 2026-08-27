a4MicroSystemWeight.initializeScale()
a4MicroSystemWeight.tareScale()
let testMass = a4MicroSystemWeight.massGrams()
let testConnected = a4MicroSystemWeight.scaleConnected()

a4MicroSystemWeight.startCalibration()
let testCalibration = a4MicroSystemWeight.finishCalibration(100)
a4MicroSystemWeight.setCalibrationFactor(2236)
let testFactor = a4MicroSystemWeight.getCalibrationFactor()
let testRaw = a4MicroSystemWeight.rawAverage(5)

a4MicroSystemWeight.initializeKeypad()
let testKey = a4MicroSystemWeight.pressedKey()
let testWaitedKey = ""
let testKeyPressed = a4MicroSystemWeight.keyIsPressed(a4MicroSystemWeight.WeightKey.One)
