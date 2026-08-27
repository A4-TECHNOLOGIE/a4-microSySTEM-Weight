# a4 microSySTEM Weight

![A4 Technologie microSySTEM-Weight](icon.png)

MakeCode extension for the **A4 Technologie microSySTEM-Weight** educational electronic scale for **BBC micro:bit**.

The model introduces mass measurement through a concrete commercial or industrial weighing application. It combines a strain-gauge weighing system, a programmable color LCD and a 4 × 4 keypad. Students can measure, value or count articles and build their own automated scale programs.

## Product information

- **Product:** microSySTEM-Weight
- **Reference:** `MIS-WEI-K01`
- **Dimensions:** 200 × 200 × 90 mm
- **Delivery:** kit, approximately 20 minutes assembly time
- **Official product page:** https://www.a4.fr/weight-maquette-programmable-microsystem-pour-micro-bit.html
- **A4 Technologie:** https://www.a4.fr

The model includes an integrated lithium-battery holder and charging system for autonomous operation. The BBC micro:bit, 18650 battery, programming cable and USB-C charging cable are ordered separately with the `MIS-WEI-K01` version.

## Educational use

The microSySTEM-Weight can be used to study:

- acquisition of a physical quantity with a strain gauge;
- mass measurement, tare and calibration;
- measurement stability, accuracy and data filtering;
- unit conversion and price-per-kilogram calculations;
- identification and valuation of articles with the keypad;
- counting identical objects from their mass;
- information processing and human-machine interfaces;
- commercial and industrial weighing applications;
- communication with **microSySTEM-AI Vision** for advanced scenarios such as automatic article recognition or price checking.

## Hardware

The extension supports:

- the **DFRobot Gravity I2C Weight Sensor Kit KIT0176**;
- stable mass readings in grams;
- tare and two-step calibration with a known reference mass;
- the integrated **4 × 4 matrix keypad**;
- the **DFRobot programmable color LCD** through the official `lcdDisplay` dependency.

### Connections used by the extension

| Component | Connection |
|---|---|
| KIT0176 weighing module | 3.3 V I2C port |
| DFRobot color LCD | 3.3 V I2C port |
| Keypad rows | P15, P14, P13, P8 |
| Keypad columns | P3, P2, P1, P0 |

> The 8-pin keypad connector is intentionally used in the reversed orientation shown above. Initializing the keypad disables the micro:bit LED matrix because pin P3 is required by the keypad.

## Add the extension in MakeCode

1. Open [MakeCode for micro:bit](https://makecode.microbit.org/).
2. Create or open a project.
3. Select **Extensions**.
4. Paste the following repository address into the search field:

```text
https://github.com/A4-TECHNOLOGIE/a4-microSySTEM-Weight
```

5. Select **a4 microSySTEM Weight**.

The DFRobot `lcdDisplay` extension is added automatically and its blocks can be used alongside the A4 scale and keypad blocks.

## First use

Initialize the scale before reading a mass. Initialize the keypad when it is needed:

```typescript
a4MicroSystemWeight.initializeScale()
a4MicroSystemWeight.initializeKeypad()
```

The scale and keypad functions also initialize their hardware automatically when required, but explicit initialization makes the program sequence easier to understand.

## Calibration with a 100 g reference mass

The A4 teaching activities use a **100 g reference mass**.

1. Place the model on a stable, level surface.
2. Remove every object from the weighing tray.
3. Run **start scale calibration**.
4. Place the 100 g reference mass in the center of the tray.
5. Wait until the mechanical assembly is stable.
6. Run **calibrate scale with a reference mass of 100 g**.

```typescript
a4MicroSystemWeight.startCalibration()

// Place the 100 g reference mass on the tray before this call.
let calibrationOk = a4MicroSystemWeight.finishCalibration(100)
```

The second function returns `true` when a valid calibration factor has been calculated. The factor remains active until the program restarts. A previously determined factor can be restored at startup with `setCalibrationFactor(...)`.

## Blocks / API

### Initialize the scale

```typescript
a4MicroSystemWeight.initializeScale()
```

Initializes the I2C weighing module, discards the first readings and records the current empty-scale value.

### Tare the scale

```typescript
a4MicroSystemWeight.tareScale()
```

Sets the current load to zero. Keep the tray mechanically stable while the tare is being performed.

### Read the mass in grams

```typescript
let mass = a4MicroSystemWeight.massGrams()
```

Returns the measured mass in grams using averaged samples and the current calibration factor. Very small residual values around zero are suppressed.

### Check the weighing module

```typescript
let connected = a4MicroSystemWeight.scaleConnected()
```

Returns `true` when a valid data frame can be read from the KIT0176 weighing module.

### Start and complete a two-step calibration

```typescript
a4MicroSystemWeight.startCalibration()
let calibrationOk = a4MicroSystemWeight.finishCalibration(100)
```

The first function records the unloaded value. The second calculates the calibration factor from the known reference mass in grams.

### Initialize the 4 × 4 keypad

```typescript
a4MicroSystemWeight.initializeKeypad()
```

Configures the keypad pins and disables the micro:bit LED matrix because P3 is used as a keypad column.

### Read the key currently pressed

```typescript
let key = a4MicroSystemWeight.pressedKey()
```

Returns `"1"` to `"9"`, `"0"`, `"A"` to `"D"`, `"*"` or `"#"`. It returns an empty string when no stable key press is detected.

### Wait for one complete key press

```typescript
let key = a4MicroSystemWeight.waitForKey()
```

Waits for a key press and release, then returns the key as text.

### Test a selected key

```typescript
let pressed = a4MicroSystemWeight.keyIsPressed(
    a4MicroSystemWeight.WeightKey.A
)
```

Returns `true` while the selected keypad key is pressed.

### Advanced calibration and diagnostics

```typescript
a4MicroSystemWeight.setCalibrationFactor(2236)
let factor = a4MicroSystemWeight.getCalibrationFactor()
let rawValue = a4MicroSystemWeight.rawAverage(10)
```

These advanced blocks apply a known calibration factor, return the current factor or expose averaged raw sensor data for diagnostics.

## Example: simple mass measurement

```typescript
input.onButtonPressed(Button.A, function () {
    a4MicroSystemWeight.tareScale()
})

a4MicroSystemWeight.initializeScale()

basic.forever(function () {
    serial.writeValue(
        "mass_g",
        Math.round(a4MicroSystemWeight.massGrams())
    )
    basic.pause(250)
})
```

The same mass value can be displayed on the model's color LCD with the blocks from the included `lcdDisplay` extension.

Additional ready-to-use examples are available in the [`examples`](examples) folder for mass and tare, 100 g calibration and keypad testing.

## Français

Cette extension MakeCode permet de programmer la balance pédagogique **microSySTEM-Weight** d'A4 Technologie.

La maquette `MIS-WEI-K01` permet d'étudier la mesure de masse et de développer une balance de type commercial ou industriel. Elle associe une jauge de contrainte, un clavier souple 4 × 4 et un écran LCD couleur programmable. Les blocs de l'extension prennent en charge l'initialisation du capteur, la tare, l'étalonnage avec une masse connue, la lecture de la masse en grammes et le clavier inversé de la maquette.

Les activités A4 utilisent une masse étalon de **100 g**. La maquette peut aussi communiquer avec **microSySTEM-AI Vision** pour imaginer des scénarios de reconnaissance automatique d'articles ou de contrôle de prix.

- [Page produit microSySTEM-Weight](https://www.a4.fr/weight-maquette-programmable-microsystem-pour-micro-bit.html)
- [Site A4 Technologie](https://www.a4.fr)

## License

This extension is released under the **MIT License**. See [LICENSE](LICENSE).

---

for PXT/microbit
