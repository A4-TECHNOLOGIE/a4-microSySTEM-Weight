# calibrate scale with a reference mass

Completes the second calibration step and calculates the conversion factor from a known reference mass. It returns true when a valid factor has been calculated.

```sig
a4MicroSystemWeight.finishCalibration(100)
```

## Parameters

- **referenceMass**: the known calibration mass in grams, from 1 to 1000.

## Example

This example allows three seconds to place a 100 g reference mass after the empty-scale value has been recorded.

```blocks
a4MicroSystemWeight.startCalibration()
serial.writeLine("place 100 g")
basic.pause(3000)

let calibrationOk = a4MicroSystemWeight.finishCalibration(100)
serial.writeValue("calibration_ok", calibrationOk ? 1 : 0)
```

## See also

- [start scale calibration](./start-calibration)
- [calibration factor](./get-calibration-factor)

```package
a4-microsystem-weight=github:A4-TECHNOLOGIE/a4-microSySTEM-Weight
```
