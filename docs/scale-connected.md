# scale connected

Returns true when a valid data frame can be read from the KIT0176 weighing module.

```sig
a4MicroSystemWeight.scaleConnected()
```

## Example

This program writes 1 when the weighing module is detected and 0 otherwise.

```blocks
a4MicroSystemWeight.initializeScale()
serial.writeValue("connected", a4MicroSystemWeight.scaleConnected() ? 1 : 0)
```

## See also

- [initialize scale](./initialize-scale)

```package
a4-microsystem-weight=github:A4-TECHNOLOGIE/a4-microSySTEM-Weight
```
