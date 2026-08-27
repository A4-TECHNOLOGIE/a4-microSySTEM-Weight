# Testing and validation

This document defines the compilation and hardware acceptance tests for the **a4 microSySTEM Weight** MakeCode extension.

## Automated compilation test

The root `test.ts` file references every public function and the DFRobot LCD dependency. The diagnostic functions are intentionally not called so the MakeCode simulator does not attempt to communicate with unavailable I2C hardware.

The automated test passes when:

- the extension project compiles without TypeScript errors;
- every public API remains available;
- the simulator starts without a hardware-related exception.

Any compilation error, missing symbol or simulator exception is a failure.

## Required hardware

- one assembled microSySTEM-Weight model;
- one BBC micro:bit;
- one 100 g reference mass;
- the KIT0176 weighing module, color LCD and 4 × 4 keypad connected as described in the README.

Place the model on a stable, level surface before testing.

## Test 1 - weighing module and tare

1. Import and run the mass-and-tare diagnostic.
2. Confirm that the LCD displays `CAPTEUR OK`.
3. Remove every object from the tray and press button A.
4. Wait for the tare to finish.

**Pass:** the displayed mass returns to `0 g` or remains within ±1 g with the empty tray.

**Fail:** the sensor is not detected, the displayed value is unstable, or the empty value remains outside ±1 g.

## Test 2 - calibration with 100 g

1. Start with an empty tray.
2. Press button B to record the unloaded value.
3. Place the 100 g reference mass in the center when requested.
4. Keep the tray stable until calibration finishes.

**Pass:** the LCD displays `ETALONNAGE OK` and the measured value is between 98 g and 102 g.

**Fail:** calibration is rejected or the final value lies outside 98-102 g.

## Test 3 - reversed 4 × 4 keypad

Press the keys in this order:

```text
1 2 3 A
4 5 6 B
7 8 9 C
* 0 # D
```

**Pass:** every displayed character matches the pressed key.

**Fail:** a key is missing, swapped, repeated without a new press, or mapped to another character.

## Validated reference result

The reference microSySTEM-Weight model was validated with the following results:

- weighing module detected: `CAPTEUR OK`;
- empty value after tare: `0 g`;
- value with the 100 g reference mass: `100 g`;
- all 16 keypad keys: correct.
