# tare scale

Sets the current load as the new zero value. The tray must remain stable while the tare is performed.

```sig
a4MicroSystemWeight.tareScale()
```

## Example

This program initializes the scale and uses button A to perform a new tare.

```blocks
input.onButtonPressed(Button.A, function () {
    a4MicroSystemWeight.tareScale()
})

a4MicroSystemWeight.initializeScale()
```

## See also

- [initialize scale](./initialize-scale)
- [mass (g)](./mass-grams)

```package
a4-microsystem-weight=github:A4-TECHNOLOGIE/a4-microSySTEM-Weight
```
