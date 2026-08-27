# scale calibration factor

Returns the calibration factor currently used to convert raw sensor values into grams.

```sig
a4MicroSystemWeight.getCalibrationFactor()
```

## Example

This program sends the active calibration factor to the serial console.

```blocks
serial.writeValue(
    "calibration_factor",
    a4MicroSystemWeight.getCalibrationFactor()
)
```

## See also

- [set scale calibration factor](./set-calibration-factor)
- [finish calibration](./finish-calibration)

```package
a4-microsystem-weight=github:A4-TECHNOLOGIE/a4-microSySTEM-Weight
```
