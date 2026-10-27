# Roadmap

This page separates the capabilities already present in MycoBox from planned improvements.

The roadmap is directional rather than a release schedule. Priorities may change as hardware is tested and the control architecture evolves.

**P2 — extensions** identifies planned improvements beyond the core climate-control and reliability work. Feature IDs F19–F26 keep these extensions traceable. Where an existing area also contains a P2 extension, the priority applies to the stated feature scope; other planned work keeps its existing scope.

---

# Available now

MycoBox already provides:

* a responsive local web interface with Overview, Measurements, Cycle & automation, Zigbee, Activity log, Cluster and System pages;
* a Growbox visualization showing recent confirmed output states, measurement freshness and local warnings;
* SHT41 temperature and relative-humidity measurements, with charts and activity tracks for Humidifier, Fan, Heat and Sensor heater;
* cycles of up to 32 days with four time points per day, Timer or Adaptive humidification, timed Fan control, heating and a daily Light window;
* one paired Zigbee outlet or power strip, with discovered ON/OFF outputs assigned separately to Humidifier, Fan, Light and Heat;
* readable equipment events, sorting of loaded Activity log entries and expandable Technical details;
* local settings, hardware timekeeping and firmware updates for both controllers through the web interface.

Local warnings assess persistent temperature or humidity deviations, unavailable measurements and sustained lack of response reported by Adaptive humidification. They run on the controller, while the web page shows their status. Warning observations and measurement/activity history are held in memory and start again after a restart.

These functions are a basis for the extensions below. A diagram or confirmed output state does not measure physical airflow, heat or mist, and local warnings do not provide independent equipment protection. See [Web Interface](web-interface.md), [Compatibility](compatibility.md) and [Safety](safety.md).

---

# Planned capabilities

| Area | Extension priority / ID | Planned development |
| --- | --- | --- |
| [CO₂ control](#co₂-based-ventilation-control) | — | Add a verified CO₂ measurement path, then use it as an input for ventilation control. |
| [Alarms and warnings](#alarms-and-warnings) | — | Extend the existing local warnings with broader fault coverage, retained alarm history and clear recovery behavior. |
| [Zigbee scale testing](#zigbee-scale-and-reliability-testing) | — | Broaden device and recovery testing; support for multiple paired devices requires an explicit extension beyond the current one-device limit. |
| [Additional Zigbee sensors and measurement points](#additional-zigbee-environmental-sensors) | P2 / F21: additional measurement points | Add compatible Zigbee environmental sensors and named chamber, ambient and optional substrate measurement points. |
| [Advanced lighting](#advanced-zigbee-lighting) | P2 / F24: dimming and lighting programs | Extend ON/OFF lighting with dimming, scheduled brightness and optional sunrise/sunset transitions; retain device-dependent color control as a separate planned extension. |
| [Cultivation log and reports](#cultivation-log-and-reports) | P2 / F19 | Add cycle-specific notes, event summaries and reports using the existing measurement history and environmental profiles. |
| [Water level and leak detection](#water-level-and-leak-detection) | P2 / F20 | Monitor compatible water-level and leak sensors and define appropriate alarms and equipment responses. |
| [Variable actuator output](#variable-actuator-output) | P2 / F22 | Adjust fan speed or humidification intensity where verified hardware supports variable output. |
| [Plant mode and VPD](#plant-mode-and-vpd) | P2 / F23 | Add plant-oriented labels and profiles, VPD calculation and charts with explicit leaf-temperature assumptions. |
| [Simple irrigation](#simple-irrigation) | P2 / F25 | Add scheduled or compatible substrate-sensor-based watering with bounded pump operation. |
| [Local API and Home Assistant integration](#local-api-and-home-assistant-integration) | P2 / F26 | Provide a documented local integration for measurements, status and controlled commands; evaluate MQTT where useful. |

---

# CO₂-based ventilation control

The current sensor is an SHT41, which measures temperature and relative humidity. MycoBox does not currently measure CO₂; Fan control uses configured ON/OFF periods.

CO₂-based ventilation first requires a supported and physically verified CO₂ sensor, clear measurement availability and a corresponding interface. Sensor selection and validation in the intended humidity range are part of that work.

Planned work includes:

* configurable CO₂ targets or thresholds,
* automatic Fresh Air Exchange (FAE) based on measured CO₂,
* hysteresis and timing limits to avoid excessive fan switching,
* coordination between CO₂ control and the existing ventilation schedule,
* clear fallback behavior when CO₂ measurements are unavailable or invalid,
* historical visibility of CO₂-driven ventilation events.

The goal is to allow ventilation to respond to the actual conditions inside the controlled environment instead of relying only on fixed ON/OFF timing.

---

# Alarms and warnings

The existing Growbox warnings already distinguish persistent environmental deviations from short fluctuations. They also show when assessment is paused or unavailable and retain a previously observed warning visibly when fresh status is lost.

Temperature and RH deviations require 30 minutes of observed trouble; unavailable measurements and sustained lack of humidification response require 15 minutes. Recovery must remain stable for five minutes. Planned sensor heating/cooling, maintenance and measurement gaps pause the relevant assessment. Restarting clears these observations; there is no retained alarm history or notification service.

Further alarm and warning work includes:

* broader detection of unavailable or unresponsive actuators and persistent communication faults;
* extending response assessment beyond the existing Adaptive humidification status;
* clearer recovery, acknowledgement and escalation behavior;
* retained alarm history linked to the cultivation log and reports;
* appropriate responses to future leak, water-level and additional sensor signals;
* configurable limits where they can be defined and validated for the supported control mode.

Warnings should be visible in the local user interface and provide enough context to explain what condition was detected and which part of the system is affected.

Alarm behavior should remain local-first and must not depend on an external cloud service.

---

# Zigbee scale and reliability testing

MycoBox currently supports one paired Zigbee switch or power strip. It discovers up to 32 compatible ON/OFF outputs with endpoint numbers from 1 to 240, including nonconsecutive numbering. This is an output limit, not support for 32 separately paired devices.

Further validation should broaden the set of physical devices and cover demanding operation within this supported scope. A larger installation with multiple paired devices remains future work and requires changes to device management and assignments before scale testing can establish a supported network size.

Testing should cover:

* different verified outlet and power-strip models;
* discovery of nonconsecutive endpoints and devices exposing more outputs;
* several independently controlled endpoints,
* repeated command execution over long-running tests,
* device rejoin behavior after power loss,
* coordinator restart and recovery,
* simultaneous actuator activity,
* communication reliability under repeated use;
* behavior when the paired device becomes unavailable;
* multiple paired devices operating together, after multi-device support is implemented.

The results will be used to define practical network-size recommendations and improve recovery behavior where required.

---

# Additional Zigbee environmental sensors

The SHT41 environmental sensor is currently connected directly to the ESP32-S3 Main Controller. Zigbee environmental sensors are not supported.

A planned extension is support for compatible Zigbee sensor devices.

Potential sensor classes include:

* temperature sensors,
* humidity sensors,
* combined temperature and humidity sensors,
* CO₂ sensors where a compatible Zigbee implementation is available,
* other environmental sensors that are useful for controlled-environment automation.

Zigbee sensor support will require discovery of device capabilities, periodic measurement reporting, sensor identity and availability tracking, and a clear method for assigning measurements to MycoBox control functions.

The initial implementation should focus on well-defined standard Zigbee clusters before considering manufacturer-specific device behavior.

## Additional measurement points — P2 / F21

Extend the sensor model to distinguish measurements from different physical locations, using supported directly connected or Zigbee sensors as appropriate.

Planned work includes:

* identifiable measurement points with names and roles, such as chamber air, ambient air outside the chamber and an optional substrate probe,
* temperature and humidity comparison between the chamber and its surroundings,
* separate history and availability status for each measurement point,
* explicit selection of the measurement used by a control function,
* visibility of stale or missing readings without silently substituting another sensor,
* physical validation of each supported probe and placement.

This extends the sensor work above with location and role handling. It should help explain environmental conditions and unreachable targets while keeping control inputs explicit.

---

# Advanced Zigbee lighting

Lighting is currently controlled as an ON/OFF Zigbee function.

A planned lighting upgrade is support for Zigbee lighting devices with richer controls.

**P2 / F24** covers dimming and lighting programs built on the existing time-dependent profiles. Color and color-temperature control remain additional roadmap items with separate prioritization.

Planned capabilities include:

* brightness / dimming control,
* optional sunrise/sunset ramps and gradual brightness transitions on verified devices,
* configurable brightness limits and defined behavior when a light becomes unavailable,
* color-temperature control where supported,
* RGB or other color control where supported,
* brightness and color values in time-dependent schedules,
* integration with environmental profiles and cycles,
* manual testing and configuration from the local web interface.

Support will depend on the capabilities exposed by each Zigbee device. A light that supports only ON/OFF switching will continue to operate as a simple switch-type actuator.

---

# Cultivation log and reports

**Priority: P2 / F19**

MycoBox already provides measurement history and time-dependent environmental profiles. The planned extension is a record of a specific cultivation run that connects those capabilities.

Planned work includes:

* a cycle name, start and end dates, and user notes,
* a record of phase changes and relevant alarms during the run,
* a summary of measurements, configured targets and time outside target bands,
* clear indication of missing data in reports,
* a downloadable cycle report using the recorded history.

Cycle reports depend on the available measurement and event history; they should reuse that history rather than create a separate logging system.

---

# Water level and leak detection

**Priority: P2 / F20**

Add support for verified sensors or device signals that report water availability and leaks.

Planned work includes:

* low-water or empty-reservoir detection where supported,
* leak detection where a compatible sensor is installed,
* explicit assignment of each signal to the affected reservoir or equipment,
* appropriate alarms and defined responses, such as stopping an affected pump or humidifier,
* visible sensor availability, a defined response to missing or stale signals, and clear recovery or acknowledgement behavior.

Water-related alarms should use the planned [Alarms and warnings](#alarms-and-warnings) mechanism.

This feature may be brought forward when required by the selected pump or humidifier. Device behavior must be based on a real supported signal and tested with the connected equipment.

---

# Variable actuator output

**Priority: P2 / F22**

Extend equipment control where a verified actuator supports more than ON/OFF switching.

Planned work includes:

* fan-speed control or adjustable humidification output where exposed by the device,
* explicit discovery and configuration of the supported output range,
* configurable minimum and maximum levels,
* controlled transitions between levels and predictable interaction with automatic and manual modes,
* defined behavior when level commands fail or the device becomes unavailable.

Lighting brightness is covered by F24 in [Advanced Zigbee lighting](#advanced-zigbee-lighting). Switch-only actuators retain ON/OFF control.

---

# Plant mode and VPD

**Priority: P2 / F23**

Build on MycoBox's existing plant-growing applications and environmental profiles with plant-oriented measurements and presentation.

Planned work includes:

* vapor pressure deficit (VPD) calculation and charts from valid temperature and relative-humidity measurements,
* explicit display of whether the value is air VPD or an estimated leaf VPD,
* visible leaf-temperature assumptions or a configured offset when a leaf temperature is not measured,
* plant-oriented labels and editable profile templates,
* missing-data handling consistent with the underlying sensors.

The initial scope is calculation, presentation and profile support. Any later control based on VPD requires a separately validated control behavior.

---

# Simple irrigation

**Priority: P2 / F25**

Add basic watering control for a defined plant-growing setup using compatible pumps or valves.

Planned work includes:

* scheduled watering, with optional feedback from a verified substrate sensor assigned through F21,
* explicit assignment, manual testing and cancellation of a watering action,
* a maximum run time and minimum interval between watering actions,
* clear behavior after restart or interrupted watering, including avoiding unintended replay of missed actions,
* use of water-level or leak information from F20 when available,
* recording of watering events in the existing history.

The initial scope is simple irrigation. Nutrient dosing and pH/EC-based fertigation require separate planning and hardware validation.

---

# Local API and Home Assistant integration

**Priority: P2 / F26**

Provide one documented local integration path that exposes supported MycoBox capabilities.

Planned work includes:

* reading measurements, targets, operating modes, device availability and alarms,
* authenticated control commands with validation consistent with the local user interface,
* a documented interface and examples for Home Assistant,
* clear behavior when the external client disconnects or sends conflicting commands,
* consideration of MQTT where it provides a useful integration path.

Environmental automation remains on MycoBox. External integrations should use the same control rules and configuration as the local interface.

---

# Roadmap principles

Planned features should preserve the core MycoBox design goals:

* local-first operation,
* useful functionality without a mandatory cloud service,
* predictable behavior after network or power interruptions,
* clear separation between automation logic and hardware-specific communication,
* safe fallback behavior when sensors or actuators are unavailable,
* explicit hardware compatibility rather than assuming that all Zigbee devices behave identically.

New device classes will be added to the compatibility documentation as they become firmware-supported and physically verified.

---

# Related documentation

* [Compatibility](compatibility.md)
* [Hardware Overview](hardware-overview.md)
* [Zigbee Setup](zigbee.md)
* [Troubleshooting](troubleshooting.md)
* [Safety](safety.md)
