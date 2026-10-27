# Compatibility

[MycoBox home](../README.md) · [Documentation](README.md) · [Getting Started](getting-started.md)

This page separates **firmware support** from **physical testing of a particular device**. An implemented limit or supported device class does not establish compatibility with every commercial product.

## Main hardware

| Component | Role | Firmware support |
| --- | --- | --- |
| ESP32-S3 | Main Controller | Measurements, automation, schedules, Wi-Fi, local web interface, display and firmware management. |
| ESP32-H2 | Zigbee Controller | Dedicated Zigbee coordinator for the paired switching device. |
| DS3231 | Real-time clock | Offline time when the RTC is connected and holds a valid time. |
| SSD1306 128 × 32 display and joystick | Local interface | Basic status, network details and local controls. |

Board wiring and power requirements must match the controller hardware. The component name alone does not make arbitrary development boards or modules interchangeable. See [Hardware Overview](hardware-overview.md).

## Environmental sensors

The current configuration uses **one Sensirion SHT41** connected to the Main Controller for **temperature and relative humidity**.

| Sensor | Measurements | Status |
| --- | --- | --- |
| SHT41 | Temperature and RH | Supported by the configured temperature and humidity reader. |
| SCD4x or SHT3x families | — | Not handled by the current sensor configuration. |
| Zigbee environmental sensors | — | Not supported. |

There is no CO₂ measurement or altitude-compensation menu in the current interface.

SHT41 heating and cooling temporarily pause ambient readings. The panel shows these phases separately from a communication error. Automatic sensor-heater handling does not establish measurement accuracy under condensation or prolonged high humidity; compare against a suitable reference for your conditions. Long-term RH accuracy and the heater/cooling behavior require physical validation in the actual installation.

## Zigbee actuator compatibility

MycoBox supports **one paired Zigbee switching device**: a compatible smart outlet or a power strip with independent ON/OFF outputs. A single-outlet device can serve one role. To use several roles, choose one device with enough independent compatible outputs.

The device must expose discoverable Home Automation ON/OFF server outputs. The firmware detects up to **32 outputs**, using their actual endpoint numbers in **1–240**. Numbers do not need to be consecutive. These are implementation limits, not a list of physically verified device configurations.

The four assignable roles are:

| Role | Purpose |
| --- | --- |
| Humidifier | Switch the humidifier. |
| Fan | Switch the ventilation fan. |
| Light | Switch the light. |
| Heat | Switch suitable heating equipment. |

Each role requires a different output from the same paired device. Two roles cannot share an output. Output assignments must be saved before the corresponding automation can use them.

An ON/OFF-compatible relay or switch may meet the protocol requirements, but its electrical design, firmware behavior and individual outputs still need testing. Do not assume that all plugs, relays or products carrying a Zigbee logo are compatible.

See [Zigbee Setup](zigbee.md) for pairing, tests and assignment instructions.

## Zigbee device types not currently supported

The current control path does not support:

- multiple separately paired plugs as a collection of role outputs;
- battery-powered Zigbee temperature, humidity or other environmental sensors;
- dimming, color or color-temperature control;
- functions that require commands beyond ON/OFF switching;
- manufacturer-specific behavior that does not expose compatible detected outputs.

A device that joins but exposes no compatible outputs is rejected. A descriptor-read error is a recognition failure and should be investigated separately from an unsupported device.

## Multi-outlet devices

A compatible strip can provide independent outputs for all four roles. For example, after identifying the actual outputs:

| Detected output | Assignment |
| --- | --- |
| One independent outlet | Humidifier |
| A different outlet | Fan |
| A different outlet | Light |
| A different outlet | Heat |

No particular output number is implied by this table. The numbers reported by the device may differ from its printed outlet labels.

Before enabling control, test ON and OFF on each output, identify the physical outlet, save its assignment and verify the connected equipment. Assignment changes require confirmation that the old and new outputs are OFF. Independent switching must be checked with the actual device.

If maintenance is active after a network reset or H2 update, manual ON testing stays blocked until a new assignment is saved. Keep equipment isolated while restoring assignments for unknown outputs, since automation can resume after a successful save. Use the [maintenance recovery sequence](zigbee.md#restoring-assignments-after-maintenance).

## Verified device models

The project's documented physical test covers this particular product:

| Manufacturer / brand | Model | Device type | Reported result |
| --- | --- | --- | --- |
| BORUIDAPLS | WP34 | Zigbee power strip | Previously tested with MycoBox as a multi-output switching device. |

This entry records a tested unit; it does not certify every WP34 rebrand, hardware revision or firmware revision. Similar-looking products can use different Zigbee implementations. Retest pairing, detected outputs and independent switching after a relevant firmware or hardware change.

The firmware's limits of 32 outputs and endpoint numbers up to 240 are not a claim that every such configuration has been physically tested.

## Firmware versions and compatibility

Check the release notes for the firmware installed on both controllers. Releases can change sensor requirements, output recognition, stored settings and update procedures.

Keep the Main Controller and Zigbee Controller versions compatible as directed by the release. Updating H2 requires pairing the switching device again and saving its assignments. See [Firmware Updates](firmware-update.md).

## Reporting compatibility results

When reporting a device, include:

- the firmware versions of both controllers;
- exact manufacturer, model and hardware or firmware revision if available;
- whether pairing and output detection completed;
- which detected outputs switch independently;
- results of manual ON/OFF tests and saved assignments;
- relevant messages from **Activity log** or **Technical details**.

Remove credentials and other private information from screenshots or logs before opening an [issue](https://github.com/Moffefe/MycoBox/issues).

## Related documentation

[Getting Started](getting-started.md) · [Hardware Overview](hardware-overview.md) · [Web interface](web-interface.md) · [Zigbee Setup](zigbee.md) · [Firmware Updates](firmware-update.md) · [Troubleshooting](troubleshooting.md) · [Safety](safety.md)
