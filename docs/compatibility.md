# Compatibility

This page describes the hardware and device classes currently supported by MycoBox firmware.

Compatibility is divided into two categories:

- **Firmware-supported** — the device type or hardware family is explicitly handled by the current MycoBox firmware.
- **Verified device model** — a specific commercial device has been physically tested with MycoBox.

A device being part of a supported class does not guarantee that every model from every manufacturer will behave identically.

---

# Main hardware

| Component | Role | Status | Notes |
| --- | --- | --- | --- |
| ESP32-S3 | Main Controller | Supported | Runs the web interface, environmental-control logic, Wi-Fi, logging and firmware management. |
| ESP32-H2 | Zigbee Controller | Supported | Operates as the dedicated Zigbee Coordinator. |
| DS3231 | Real-time clock | Supported | Used as the local offline time source. |

---

# Environmental sensors

Current MycoBox firmware supports sensors from the following families:

| Sensor family | Measurements | Status | Notes |
| --- | --- | --- | --- |
| Sensirion SCD4x | Temperature, humidity, CO₂ | Firmware-supported | CO₂ is currently monitored and recorded; ventilation is not directly regulated from CO₂ concentration. |
| Sensirion SHT3x | Temperature, humidity | Firmware-supported | Used for environmental temperature and humidity measurements. |

Exact model-specific verification is not yet published in this repository.

If a sensor belongs to one of the supported families but behaves differently from expected, open a compatibility issue and include the exact model number.

---

# Zigbee actuator compatibility

MycoBox currently supports Zigbee devices that behave as **switch-type actuators**.

Typical compatible device classes include:

- smart plugs,
- single-channel switches,
- relay modules,
- multi-outlet power strips exposing independent switch endpoints.

These devices can be assigned to the following MycoBox functions:

- **Humidifier**
- **FAE / Fan**
- **Light**
- **Heatpad**

The current Zigbee switch controller supports endpoints:

```text
1 through 6
```

For ordinary single-outlet smart plugs, start with:

```text
Endpoint 1
```

For multi-outlet devices, test the available endpoints individually. Endpoint numbering is determined by the Zigbee device manufacturer and may not match the physical outlet numbering.

See [Zigbee Setup](zigbee.md) for pairing, testing and binding instructions.

---

# Zigbee device types not currently supported

The current MycoBox binding system is not intended for:

- battery-powered Zigbee environmental sensors,
- Zigbee dimmers requiring level control,
- color or color-temperature lighting control,
- devices requiring commands other than simple ON/OFF switching,
- unsupported manufacturer-specific Zigbee implementations.

A Zigbee device may successfully join the network and still be unusable through the current MycoBox binding system if it does not expose a compatible switch endpoint.

---

# Multi-outlet devices

Compatible multi-outlet devices can be useful because one Zigbee device may control several MycoBox functions.

Example:

```text
Zigbee power strip
├── Endpoint 1 → Humidifier
├── Endpoint 2 → Fan
├── Endpoint 3 → Light
└── Endpoint 4 → Heatpad
```

Before enabling automatic control:

1. Identify every physical outlet.
2. Test ON and OFF manually.
3. Confirm the correct endpoint.
4. Save the MycoBox binding.
5. Test the binding again.

Do not assume endpoint numbering from the physical outlet labels.

---

# Verified device models

A model-specific compatibility list will only contain devices that have been physically tested.

No public model-specific verification list has been published yet.

Future entries should use the following format:

| Manufacturer | Model | Device type | Endpoints | Result | Notes |
| --- | --- | --- | --- | --- | --- |
| Example | Example model | Smart plug | 1 | Verified | Example only — replace with a physically tested device before publishing. |

Do not treat the example row above as a compatibility claim.

---

# Firmware versions and compatibility

Compatibility information applies to the current public MycoBox firmware unless stated otherwise.

A firmware update may change:

- supported Zigbee behavior,
- endpoint handling,
- sensor support,
- pairing behavior,
- firmware-update requirements.

Always read the release notes before updating.

See [Firmware Updates](firmware-update.md).

---

# Reporting compatibility results

If you test hardware that is not already listed, open a GitHub issue and include:

- MycoBox firmware version,
- exact manufacturer and model,
- device type,
- Zigbee endpoint or endpoints used,
- whether pairing succeeded,
- whether manual ON/OFF control worked,
- whether MycoBox binding worked,
- any unusual behavior,
- relevant logs or screenshots.

For Zigbee devices, do not report only the marketing name if a more precise model number is available.

Compatibility reports help distinguish firmware support from manufacturer-specific behavior.

---

# Related documentation

- [Getting Started](getting-started.md)
- [Hardware Overview](hardware-overview.md)
- [Zigbee Setup](zigbee.md)
- [Firmware Updates](firmware-update.md)
- [Troubleshooting](troubleshooting.md)
- [Safety](safety.md)
