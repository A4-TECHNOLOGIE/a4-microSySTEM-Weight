# wait for keypad key

Waits for a complete keypad press and release, then returns the selected key as text.

```sig
a4MicroSystemWeight.waitForKey()
```

## Example

This program waits for each complete key press and sends the result to the serial console.

```blocks
a4MicroSystemWeight.initializeKeypad()

basic.forever(function () {
    serial.writeLine(a4MicroSystemWeight.waitForKey())
})
```

## See also

- [pressed keypad key](./pressed-key)
- [test a selected key](./key-is-pressed)

```package
a4-microsystem-weight=github:A4-TECHNOLOGIE/a4-microSySTEM-Weight
```
