# average raw scale value

Returns the average of several valid raw readings from the weighing module. This advanced diagnostic block does not convert the value into grams.

```sig
a4MicroSystemWeight.rawAverage(10)
```

## Parameters

- **samples**: the number of valid samples to average, from 1 to 50.

## Example

This program sends a ten-sample raw average to the serial console.

```blocks
a4MicroSystemWeight.initializeScale()
serial.writeValue("raw", a4MicroSystemWeight.rawAverage(10))
```

## See also

- [mass (g)](./mass-grams)
- [scale connected](./scale-connected)

```package
a4-microsystem-weight=github:A4-TECHNOLOGIE/a4-microSySTEM-Weight
```
