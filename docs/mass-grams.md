# mass (g)

Returns the measured mass in grams using averaged samples and the current calibration factor. Very small residual values around zero are suppressed.

```sig
a4MicroSystemWeight.massGrams()
```

## Example

This program sends the rounded mass to the serial console four times per second.

```blocks
a4MicroSystemWeight.initializeScale()

basic.forever(function () {
    serial.writeValue("mass_g", Math.round(a4MicroSystemWeight.massGrams()))
    basic.pause(250)
})
```

## See also

- [initialize scale](./initialize-scale)
- [tare scale](./tare-scale)

```package
a4-microsystem-weight=github:A4-TECHNOLOGIE/a4-microSySTEM-Weight
```
