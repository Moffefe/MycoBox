# Compatibility

<a id="related-documentation"></a>

[MycoBox home](../README.md) · [Documentation](README.md) · [Getting started](getting-started.md)

Use this guide to choose sensors and a smart plug or power strip for MycoBox.

## Main hardware

| Component | What it does |
| --- | --- |
| ESP32-S3 | Runs the main controller, automation and web panel |
| ESP32-H2 | Connects to the Zigbee switch |
| DS3231 | Keeps the clock running offline |
| SSD1306 128 × 32 display and joystick | Shows status and provides local controls |

For component connections and roles, see [Hardware overview](hardware-overview.md). Replacement parts need to match your controller's wiring and power supply.

## Environmental sensors

| Sensor | Support |
| --- | --- |
| One Sensirion SHT41 connected to the Main Controller | Temperature and relative humidity |
| SCD4x or SHT3x | Not supported |
| Zigbee environmental sensors | Not supported |
| Water-level or leak sensors | Not supported |

MycoBox currently measures temperature and humidity, without CO₂. See [sensor placement](safety.md#sensor-placement) for where to mount the SHT41 and [sensor states](web-interface.md#sensor-heating-and-cooling) for heating and cooling messages.

<a id="multi-outlet-devices"></a>

## Zigbee actuator compatibility

| Feature | Support |
| --- | --- |
| Paired devices | **One** smart plug or power strip |
| Switching | Independent ON/OFF outputs using the Zigbee Home Automation profile |
| Available roles | Humidifier, Fan, Light and Heat |
| Assignments | A different output for each role; unused roles can stay unassigned |
| Output limit | Up to **32** detected outputs, numbered **1–240** |

A single smart plug can serve one role. For several roles, choose one strip with enough independently switched outputs. Check its electrical ratings against your appliances.

The detected output numbers may differ from socket labels. Follow [Zigbee setup](zigbee.md) to identify them.

## Zigbee device types not currently supported

MycoBox does not currently control dimming, color or color temperature. It also cannot use devices that expose only manufacturer-specific outputs instead of compatible ON/OFF outputs.

If the panel reports a discovery error, try the [connection checks](troubleshooting.md#zigbee-device-does-not-appear). That message means MycoBox could not read the device; it may still be compatible.

## Verified device models

| Brand | Model | Device | Result |
| --- | --- | --- | --- |
| BORUIDAPLS | WP34 | Zigbee power strip | Tested with MycoBox as a multi-output switch |

Check the exact model and revision when buying: similar-looking strips can use different hardware.

## Firmware versions and compatibility

Read the release instructions before updating, especially if both controllers need a new version. The [firmware guide](firmware-update.md) explains which files to choose and what happens to saved settings.

## Reporting compatibility results

Tested another device? [Share the result](https://github.com/Moffefe/MycoBox/issues/new?template=setup-question.yml) with:

- its brand, model and revision;
- the S3 and H2 firmware versions;
- whether pairing worked and which outputs were found;
- which sockets switched independently in ON/OFF tests;
- any error shown by the panel.
