# initialize 4x4 keypad

Configures the 4 × 4 keypad used by microSySTEM-Weight. The micro:bit LED matrix is disabled because keypad column 1 uses pin P3.

```sig
a4MicroSystemWeight.initializeKeypad()
```

## Example

This program initializes the keypad before reading a key.

```blocks
a4MicroSystemWeight.initializeKeypad()
serial.writeLine("keypad ready")
```

## See also

- [pressed keypad key](./pressed-key)
- [wait for keypad key](./wait-for-key)

```package
a4-microsystem-weight=github:A4-TECHNOLOGIE/a4-microSySTEM-Weight
```
