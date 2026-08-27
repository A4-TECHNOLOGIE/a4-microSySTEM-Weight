# pressed keypad key

Returns the currently pressed key as text after a short debounce check. It returns an empty string when no stable key press is detected.

```sig
a4MicroSystemWeight.pressedKey()
```

## Example

This program sends each detected key to the serial console.

```blocks
a4MicroSystemWeight.initializeKeypad()

basic.forever(function () {
    let key = a4MicroSystemWeight.pressedKey()
    if (key != "") {
        serial.writeLine(key)
    }
    basic.pause(50)
})
```

## See also

- [initialize 4x4 keypad](./initialize-keypad)
- [wait for keypad key](./wait-for-key)

```package
a4-microsystem-weight=github:A4-TECHNOLOGIE/a4-microSySTEM-Weight
```
