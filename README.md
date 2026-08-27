# a4 microSySTEM Weight

MakeCode extension for the A4 Technologie **microSySTEM-Weight** educational scale.

The extension supports:

- the DFRobot Gravity I2C 1 kg Weight Sensor Kit (KIT0176);
- stable mass measurement and tare;
- two-step calibration with a known reference mass;
- the integrated 4x4 matrix keypad with its reversed connector;
- the DFRobot color LCD through the official `lcdDisplay` dependency.

## Hardware connections

| Component | Connection |
|---|---|
| KIT0176 weighing module | 3.3 V I2C port |
| DFRobot color LCD | 3.3 V I2C port |
| Keypad rows | P15, P14, P13, P8 |
| Keypad columns | P3, P2, P1, P0 |

Initializing the keypad disables the micro:bit LED matrix because pin P3 is used by the keypad.

## Use as a MakeCode extension

1. Open [MakeCode for micro:bit](https://makecode.microbit.org/).
2. Create a new project.
3. Select **Extensions**.
4. Search for `https://github.com/A4-TECHNOLOGIE/a4-microSySTEM-Weight`.

## Calibration

The supplied teaching activities use a 100 g reference mass:

1. Remove every object from the scale.
2. Run `start scale calibration`.
3. Place the 100 g reference mass in the middle of the tray.
4. Run `calibrate scale with a reference mass of 100 g`.

The second block returns `true` when a valid calibration factor has been calculated.

## Licence

MIT

---

# Français

Cette extension MakeCode permet de programmer la balance pédagogique **microSySTEM-Weight** d'A4 Technologie.

Elle prend en charge le module de pesage I2C DFRobot KIT0176, la tare, l'étalonnage avec une masse étalon, le clavier matriciel 4x4 et l'écran LCD couleur DFRobot.

Les activités pédagogiques utilisent une masse étalon de **100 g**.
