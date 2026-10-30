# Roadmap

This roadmap describes planned work, not a release schedule. Priorities may change as hardware is tested and the control architecture evolves.

**P2 — extensions** identifies improvements beyond core climate control and reliability. IDs F19–F26 keep those extensions traceable. Where an area also contains other work, P2 applies only to the stated feature scope.

## Available now

MycoBox provides local climate automation, measurements, schedules, Zigbee control and maintenance tools. See the [project overview](../README.md) and [Web interface](web-interface.md) for current behavior. Availability depends on the installed firmware; check its release notes.

## Planned capabilities

| Area | Extension priority / ID |
| --- | --- |
| [CO₂ control](#co₂-based-ventilation-control) | — |
| [Alarms and warnings](#alarms-and-warnings) | — |
| [Zigbee scale testing](#zigbee-scale-and-reliability-testing) | — |
| [Additional Zigbee sensors and measurement points](#additional-zigbee-environmental-sensors) | P2 / F21: additional measurement points |
| [Advanced lighting](#advanced-zigbee-lighting) | P2 / F24: dimming and lighting programs |
| [Cultivation log and reports](#cultivation-log-and-reports) | P2 / F19 |
| [Water level and leak detection](#water-level-and-leak-detection) | P2 / F20 |
| [Variable actuator output](#variable-actuator-output) | P2 / F22 |
| [Plant mode and VPD](#plant-mode-and-vpd) | P2 / F23 |
| [Simple irrigation](#simple-irrigation) | P2 / F25 |
| [Local API and Home Assistant integration](#local-api-and-home-assistant-integration) | P2 / F26 |

## CO₂-based ventilation control

Add a supported CO₂ sensor, physically verified in the intended humidity range, with measurement availability and a corresponding interface. Use it for:

- configurable CO₂ targets or thresholds and automatic Fresh Air Exchange (FAE);
- hysteresis and timing limits to avoid excessive fan switching;
- coordination with the ventilation schedule and fallback when readings are invalid or unavailable;
- history showing CO₂-driven ventilation events.

## Alarms and warnings

Extend the [existing local warnings](web-interface.md#warnings) with:

- broader detection of unavailable actuators, persistent communication faults and lack of response beyond Adaptive humidification;
- defined recovery, acknowledgement and escalation behavior;
- retained alarm history linked to cultivation reports;
- responses to future leak, water-level and additional sensor signals;
- configurable limits that can be validated for each supported control mode.

Alarms should explain the detected condition and affected equipment in the local interface, without depending on a cloud service.

## Zigbee scale and reliability testing

Broaden physical testing within the [supported device scope](compatibility.md#zigbee-actuator-compatibility). Cover:

- different outlet and power-strip models, nonconsecutive endpoints and devices exposing more outputs;
- independently controlled endpoints and simultaneous actuator activity;
- repeated commands and communication reliability over long-running tests;
- device rejoin after power loss, coordinator restart and recovery;
- behavior when the paired device is unavailable.

Multiple paired devices require an explicit extension to device management and assignments before tests can establish a supported network size. Use the results to define practical installation limits and improve recovery.

## Additional Zigbee environmental sensors

Add compatible temperature, humidity and combined sensors, plus CO₂ or other useful environmental sensors where supported devices exist. Start with standard Zigbee clusters before considering manufacturer-specific behavior.

Support requires capability discovery, periodic reporting, sensor identity and availability tracking, and explicit assignment of measurements to control functions.

### Additional measurement points — P2 / F21

Distinguish named locations such as chamber air, outside ambient air and an optional substrate probe, using supported directly connected or Zigbee sensors. Provide:

- comparisons between the chamber and its surroundings;
- separate history and availability for each point;
- explicit selection of each control function's measurement input;
- visible stale or missing readings, without silently substituting another sensor;
- physical validation of every supported probe and placement.

## Advanced Zigbee lighting

**P2 / F24** covers dimming and lighting programs. Color and color-temperature control remain separate planned extensions with their own prioritization.

Planned capabilities include:

- brightness control, limits and optional sunrise/sunset ramps on verified devices;
- device-supported color temperature and RGB or other color control;
- brightness and color values integrated with time-dependent profiles and cycles;
- manual testing and configuration in the local interface;
- defined behavior when a light is unavailable.

Switch-only lights retain ON/OFF control.

## Cultivation log and reports

**Priority: P2 / F19**

Create a record of a specific cultivation run, extending the retained-data snapshot available through [diagnostic export](backup-restore.md):

- cycle name, start/end dates and user notes;
- phase changes and relevant alarms;
- summaries of measurements, targets and time outside target bands;
- downloadable reports with missing data clearly marked.

Reports should reuse available measurement and event history rather than create a separate logging system.

## Water level and leak detection

**Priority: P2 / F20**

Add verified signals for low water, an empty reservoir and leaks. Assign each signal to its reservoir or equipment and define alarms, recovery or acknowledgement, and appropriate responses such as stopping an affected pump or humidifier.

Show sensor availability and define behavior for missing or stale signals. Use the planned [alarm mechanism](#alarms-and-warnings). This work may be brought forward for the selected pump or humidifier; responses require a real supported signal and testing with the connected equipment.

## Variable actuator output

**Priority: P2 / F22**

Support fan speed or humidification intensity where a verified device exposes variable output. Discover its supported range, provide configurable minimum/maximum levels and controlled transitions, and define interaction with automatic/manual modes, failed commands and device unavailability.

Lighting brightness belongs to [F24](#advanced-zigbee-lighting). Switch-only actuators retain ON/OFF control.

## Plant mode and VPD

**Priority: P2 / F23**

Add plant-oriented labels, editable profile templates and vapor pressure deficit (VPD) calculation/charts from valid temperature and RH measurements. Distinguish air VPD from estimated leaf VPD and show any leaf-temperature assumption or configured offset. Missing-data behavior must follow the underlying sensors.

The initial scope is calculation, presentation and profiles. VPD-based control requires separate planning and validation.

## Simple irrigation

**Priority: P2 / F25**

Add scheduled watering for compatible pumps or valves, with optional feedback from a verified substrate sensor assigned through F21. Include:

- explicit assignment, manual testing and cancellation;
- maximum run time and minimum interval between actions;
- defined restart/interruption behavior that avoids unintended replay of missed watering;
- use of F20 water-level or leak information when available;
- watering events in the existing history.

Nutrient dosing and pH/EC-based fertigation require separate planning and hardware validation.

## Local API and Home Assistant integration

**Priority: P2 / F26**

Provide one documented local integration path for:

- measurements, targets, operating modes, device availability and alarms;
- authenticated commands validated by the same rules as the local interface;
- Home Assistant examples;
- defined handling of disconnected clients and conflicting commands.

Evaluate MQTT where useful. Environmental automation and configuration remain on MycoBox.

## Roadmap principles

Preserve local operation without a mandatory cloud service, predictable recovery after interruptions and safe fallback when sensors or actuators are unavailable. Keep automation separate from hardware-specific communication and verify compatibility for each supported device class before documenting it as supported.

## Related documentation

[Documentation map](README.md) · [Compatibility](compatibility.md) · [Safety](safety.md)
