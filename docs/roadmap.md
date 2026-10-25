# Roadmap

This page describes planned MycoBox development areas beyond the capabilities available in the current public firmware.

The roadmap is directional rather than a release schedule. Priorities may change as hardware is tested and the control architecture evolves.

---

# Planned capabilities

| Area | Planned development |
| --- | --- |
| CO₂ control | Use CO₂ concentration as an active input for ventilation control. |
| Alarms and warnings | Add user-visible warnings and alarms for environmental, sensor and device problems. |
| Zigbee scale testing | Validate MycoBox with a larger number of simultaneously paired Zigbee devices. |
| Additional Zigbee sensors | Add support for compatible Zigbee environmental sensors in addition to directly connected sensors. |
| Advanced lighting | Extend Zigbee lighting beyond ON/OFF with dimming and color control. |

---

# CO₂-based ventilation control

CO₂ is already available as a monitored environmental parameter when a compatible sensor such as an SCD4x is installed.

A planned development step is to use the measured CO₂ concentration directly in the environmental-control logic.

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

MycoBox should be able to distinguish normal environmental variation from conditions that require user attention.

Planned alarm and warning support includes:

* environmental values remaining outside configured limits,
* missing, invalid or stale sensor measurements,
* unavailable or unresponsive Zigbee devices,
* control actions that do not produce the expected environmental response,
* configuration problems that prevent a control function from operating correctly,
* persistent communication or hardware errors.

Warnings should be visible in the local user interface and provide enough context to explain what condition was detected and which part of the system is affected.

Alarm behavior should remain local-first and must not depend on an external cloud service.

---

# Zigbee scale and reliability testing

Current Zigbee support is being developed and tested with a limited number of physical devices.

A planned validation stage is to test MycoBox with a larger Zigbee installation.

Testing should cover:

* multiple paired devices operating at the same time,
* several independently controlled endpoints,
* repeated command execution over long-running tests,
* device rejoin behavior after power loss,
* coordinator restart and recovery,
* simultaneous actuator activity,
* communication reliability as the network grows,
* behavior when one or more devices become unavailable.

The results will be used to define practical network-size recommendations and improve recovery behavior where required.

---

# Additional Zigbee environmental sensors

Environmental sensors are currently connected directly to the ESP32-S3 Main Controller.

A planned extension is support for compatible Zigbee sensor devices.

Potential sensor classes include:

* temperature sensors,
* humidity sensors,
* combined temperature and humidity sensors,
* CO₂ sensors where a compatible Zigbee implementation is available,
* other environmental sensors that are useful for controlled-environment automation.

Zigbee sensor support will require discovery of device capabilities, periodic measurement reporting, sensor identity and availability tracking, and a clear method for assigning measurements to MycoBox control functions.

The initial implementation should focus on well-defined standard Zigbee clusters before considering manufacturer-specific device behavior.

---

# Advanced Zigbee lighting

Lighting is currently controlled as an ON/OFF Zigbee function.

A planned lighting upgrade is support for Zigbee lighting devices with richer controls.

Planned capabilities include:

* brightness / dimming control,
* color-temperature control where supported,
* RGB or other color control where supported,
* brightness and color values in time-dependent schedules,
* integration with environmental profiles and cycles,
* manual testing and configuration from the local web interface.

Support will depend on the capabilities exposed by each Zigbee device. A light that supports only ON/OFF switching will continue to operate as a simple switch-type actuator.

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
