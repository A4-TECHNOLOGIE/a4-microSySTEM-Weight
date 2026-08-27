# initialize scale

Initializes the KIT0176 I2C weighing module, discards the first readings and records the current empty-scale value. Keep the tray empty and mechanically stable while this block runs.

```sig
a4MicroSystemWeight.initializeScale()
```

## Example

This program initializes the scale and reports whether the weighing module answers correctly.

```blocks
a4MicroSystemWeight.initializeScale()

if (a4MicroSystemWeight.scaleConnected()) {
    serial.writeLine("scale connected")
} else {
    serial.writeLine("scale not detected")
}
```

## See also

- [tare scale](./tare-scale)
- [mass (g)](./mass-grams)

```package
a4-microsystem-weight=github:A4-TECHNOLOGIE/a4-microSySTEM-Weight
```
