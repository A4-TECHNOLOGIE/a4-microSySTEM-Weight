# start scale calibration

Performs a tare and records the unloaded value for the first step of a two-step calibration. Remove every object from the tray before running this block.

```sig
a4MicroSystemWeight.startCalibration()
```

## Example

This program starts calibration when button B is pressed. The tray must be empty.

```blocks
input.onButtonPressed(Button.B, function () {
    a4MicroSystemWeight.startCalibration()
    serial.writeLine("place the 100 g reference mass")
})
```

## See also

- [finish calibration](./finish-calibration)

```package
a4-microsystem-weight=github:A4-TECHNOLOGIE/a4-microSySTEM-Weight
```
