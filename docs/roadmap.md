# Roadmap

Here are the planned additions to MycoBox, grouped by what they will help you do.

## Available now

For today's features, start with the [project overview](../README.md) or [Web interface](web-interface.md).

## Planned capabilities

| Improvement | What it will help with |
| --- | --- |
| [CO₂ control](#co₂-based-ventilation-control) | Adjust ventilation to measured CO₂ |
| [Alarms and warnings](#alarms-and-warnings) | Notice persistent problems and review past alarms |
| [Broader Zigbee testing](#zigbee-scale-and-reliability-testing) | Choose reliable plugs and strips |
| [Additional measurement points](#additional-zigbee-environmental-sensors) | Compare conditions in several locations |
| [Advanced lighting](#advanced-zigbee-lighting) | Adjust brightness and lighting programs |
| [Cultivation log and reports](#cultivation-log-and-reports) | Keep notes and review a growing run |
| [Water level and leak detection](#water-level-and-leak-detection) | Respond to low water or leaks |
| [Variable actuator output](#variable-actuator-output) | Adjust fan speed or humidification intensity |
| [Plant mode and VPD](#plant-mode-and-vpd) | Use plant profiles and view VPD |
| [Simple irrigation](#simple-irrigation) | Schedule watering |
| [Local integrations](#local-api-and-home-assistant-integration) | Connect MycoBox to Home Assistant and other tools |

## CO₂-based ventilation control

Add CO₂ readings and use them to control fresh-air exchange. You will be able to set a target, see CO₂ history and compare it with fan activity.

Ventilation will combine those readings with the daily schedule, using a fallback when the sensor is unavailable.

## Alarms and warnings

Build on [current local warnings](web-interface.md#warnings) with a history of alarms and clearer notices for unreachable equipment or a lack of response.

Future water-level and leak sensors will use the same alarm view. Messages will identify the affected equipment and suggest the next check.

## Zigbee scale and reliability testing

Test more plugs and power strips, including devices with unusual output numbering or many sockets. Check independent switching, long-running operation and reconnection after power loss.

Publish the results in [Compatibility](compatibility.md). Supporting several paired devices will be a separate extension to the current one-device setup.

## Additional Zigbee environmental sensors

Add compatible temperature, humidity and other environmental sensors. Show each sensor's location, latest reading and connection state, and let you choose which one guides a control function.

<a id="additional-measurement-points--p2--f21"></a>

### Additional measurement points

Compare named locations such as chamber air, the surrounding room and an optional substrate probe.

Each point will have its own history. Missing readings will remain visible so you can tell which sensor needs attention.

## Advanced Zigbee lighting

Add dimming, brightness limits and sunrise/sunset transitions to lighting schedules.

Color temperature and color control are separate planned additions for lights that support them. Existing switch-only lights will keep their ON/OFF schedules.

## Cultivation log and reports

Keep a record of each growing run with its name, dates, phase changes and your notes. Download a report combining conditions, targets and alarms.

This will extend the short-term history available today through [diagnostic export](backup-restore.md#export-diagnostics).

## Water level and leak detection

Connect supported sensors to notice low water, empty reservoirs or leaks. Link each sensor to the equipment it monitors.

Planned responses include a clear warning and stopping an affected pump or humidifier, with guidance for restarting it after the problem is resolved.

## Variable actuator output

Adjust fan speed or humidification intensity on devices that support it. Set useful minimum and maximum levels and include them in automatic control.

Switch-only devices will keep ON/OFF control. Lighting brightness is covered by [advanced lighting](#advanced-zigbee-lighting).

## Plant mode and VPD

Add plant-oriented profile templates and charts for **vapor pressure deficit (VPD)**, a way to describe how strongly the air draws moisture from plants.

The first step is to calculate and display VPD from temperature and humidity, with any leaf-temperature estimate clearly shown. Automatic control based on VPD is a later step.

## Simple irrigation

Schedule compatible pumps or valves, test watering manually and set maximum run times and minimum intervals.

Later additions can use a substrate sensor, water-level readings and leak detection. Watering events will appear in history. Nutrient dosing and pH/EC control are separate future work.

## Local API and Home Assistant integration

Make readings, targets, modes, equipment states and alarms available to other local tools. Provide documented controls and Home Assistant examples.

MycoBox will continue running its own automation when an integration disconnects.

<a id="planning-references"></a>

## Roadmap principles

Keep everyday use local and simple, test new hardware in real installations and make interruptions easy to recover from. Priorities will follow practical testing and user feedback.

## Related documentation

[Documentation map](README.md) · [Compatibility](compatibility.md) · [Safety](safety.md)
