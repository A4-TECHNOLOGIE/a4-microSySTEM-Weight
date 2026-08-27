# keypad key is pressed

Returns true while the selected keypad key is pressed.

```sig
a4MicroSystemWeight.keyIsPressed(a4MicroSystemWeight.WeightKey.A)
```

## Parameters

- **key**: the keypad key to test.

## Example

This program reports whether keypad key A is pressed.

```blocks
a4MicroSystemWeight.initializeKeypad()

basic.forever(function () {
    let pressed = a4MicroSystemWeight.keyIsPressed(
        a4MicroSystemWeight.WeightKey.A
    )
    serial.writeValue("key_A", pressed ? 1 : 0)
    basic.pause(50)
})
```

## See also

- [initialize 4x4 keypad](./initialize-keypad)
- [pressed keypad key](./pressed-key)

```package
a4-microsystem-weight=github:A4-TECHNOLOGIE/a4-microSySTEM-Weight
```
