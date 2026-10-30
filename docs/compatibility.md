# Compatibility

<a id="related-documentation"></a>

[MycoBox home](../README.md) · [Documentation](README.md) · [Getting started](getting-started.md)

This page separates **firmware support** from **physical testing of a particular device**. Support for a device class or configuration limit does not establish compatibility with every commercial product.

## Main hardware

| Component | Supported function |
| --- | --- |
| ESP32-S3 | Main Controller |
| ESP32-H2 | Zigbee coordinator |
| DS3231 | Hardware clock with valid offline time |
| SSD1306 128 × 32 display and joystick | Basic local status and controls |

Wiring and power requirements must match the controller hardware. Component names do not make arbitrary development boards or modules interchangeable. See [Hardware overview](hardware-overview.md) for their roles and connections.

## Environmental sensors

| Sensor | Measurements | Current support |
| --- | --- | --- |
| One Sensirion SHT41 connected to S3 | Temperature and relative humidity | Supported |
| SCD4x or SHT3x families | — | Not handled by the current sensor configuration |
| Zigbee environmental sensors | — | Not supported |
| Water-level or leak sensors | — | Not supported in the current configuration |

The current configuration has no CO₂ measurement or altitude-compensation setting. SHT41 heater handling does not establish accuracy under condensation or prolonged high humidity. Long-term RH accuracy and heater/cooling behavior require physical validation in the installation, including comparison with a suitable reference.

[Measurement states](web-interface.md#sensor-heating-and-cooling) and [sensor placement](safety.md#sensor-placement) are documented separately.

<a id="multi-outlet-devices"></a>

## Zigbee actuator compatibility

| Capability | Current support |
| --- | --- |
| Paired switching devices | **One** smart outlet or power strip |
| Required protocol capabilities | Discoverable Home Automation ON/OFF server outputs |
| Detected output limit | **32**, with actual endpoint numbers **1–240**, including nonconsecutive numbers |
| Assignable roles | Humidifier, Fan, Light and Heat |
| Assignment rule | Each role uses a different output on the same device; unused roles may remain unassigned |

A single-outlet plug can serve one role. Several roles require one device with enough independently switched, compatible outputs. Endpoint numbers may differ from printed socket labels. Protocol support does not establish electrical suitability or independent switching on an untested product.

These limits describe firmware capabilities, not physically verified configurations. Use [Zigbee setup](zigbee.md) to identify and test the actual outputs before assigning them.

## Zigbee device types not currently supported

- Dimming, color, color-temperature control or other commands beyond ON/OFF switching.
- Manufacturer-specific behavior that exposes no compatible detected outputs.

A joined device without compatible outputs is rejected. A descriptor-read error is a recognition failure, rather than proof of an unsupported device; see [Troubleshooting](troubleshooting.md).

## Verified device models

| Manufacturer / brand | Model | Device type | Reported result |
| --- | --- | --- | --- |
| BORUIDAPLS | WP34 | Zigbee power strip | Previously tested with MycoBox as a multi-output switching device |

This records a tested unit, not certification of every WP34 rebrand, hardware revision or firmware revision. Similar-looking products can use different Zigbee implementations. Retest after a relevant hardware or firmware change.

## Firmware versions and compatibility

Check release notes for both controllers: releases may change sensor requirements, output recognition, stored settings or the required update order. [Firmware updates](firmware-update.md) is the reference for package compatibility and effects on saved configuration.

## Reporting compatibility results

Include both controller versions, the exact manufacturer/model and revision, whether pairing and output discovery completed, which outputs switch independently, and the results of manual ON/OFF and assignment tests. Add relevant **Activity log** or **Technical details** messages.

Remove credentials and identifying information before opening an [issue](https://github.com/Moffefe/MycoBox/issues).
