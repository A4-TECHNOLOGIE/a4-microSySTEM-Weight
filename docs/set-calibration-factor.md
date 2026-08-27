# set scale calibration factor

Applies a known positive calibration factor used to convert raw sensor values into grams. This advanced block is useful when a factor determined during an earlier calibration must be restored.

```sig
a4MicroSystemWeight.setCalibrationFactor(2236)
```

## Parameters

- **value**: the positive calibration factor to apply.

## Example

This program restores a previously determined factor before initializing the scale.

```blocks
a4MicroSystemWeight.setCalibrationFactor(2236)
a4MicroSystemWeight.initializeScale()
```

## See also

- [scale calibration factor](./get-calibration-factor)
- [finish calibration](./finish-calibration)

```package
a4-microsystem-weight=github:A4-TECHNOLOGIE/a4-microSySTEM-Weight
```
