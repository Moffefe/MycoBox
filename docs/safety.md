# Safety

MycoBox controls environmental equipment that may operate automatically and without direct supervision.

Before using the system, make sure the connected hardware is suitable for the intended environment and installed safely.

---

# Electrical safety

MycoBox may control mains-powered equipment through Zigbee smart plugs, relay modules or power strips.

Typical connected equipment may include:

* humidifiers,
* fans,
* heaters,
* heating mats,
* lighting,
* other environmental-control devices.

Always follow the electrical ratings and installation requirements of the switching device and the connected equipment.

Do not exceed:

* maximum voltage,
* maximum current,
* maximum power,
* manufacturer operating limits.

Do not use damaged plugs, cables, connectors or enclosures.

---

# High-humidity environments

Some MycoBox applications may operate in environments with elevated humidity.

Electrical equipment should not be exposed to condensation, standing water or direct mist unless it is specifically designed for such conditions.

Keep mains-voltage devices and connections away from:

* water reservoirs,
* humidifier outlets,
* direct mist,
* condensation paths,
* wet surfaces.

Position the controller and power connections where they remain dry during normal operation.

---

# Heating equipment

Heating devices require particular care because incorrect configuration or failed control equipment can create high temperatures.

Before enabling automatic heating:

1. Verify the correct Zigbee device.
2. Verify the correct endpoint.
3. Test manual ON/OFF control.
4. Confirm that the heater is suitable for unattended operation.
5. Observe the environment while testing automatic control.

Whenever practical, use heating equipment with its own independent over-temperature protection.

MycoBox should not be the only protection against unsafe heating conditions.

---

# Humidifiers

A humidifier can quickly change conditions inside a small enclosure.

Before unattended operation:

* verify the correct outlet binding,
* confirm that the humidifier switches off correctly,
* observe how humidity continues to change after the humidifier stops,
* avoid directing mist directly at sensors or electrical equipment.

A powerful humidifier in a small enclosure may cause significant overshoot.

---

# Fans and moving equipment

Fans and other equipment containing moving parts may start automatically.

Keep:

* fingers,
* loose cables,
* fabric,
* plants,
* substrate,
* other objects

away from moving parts.

Do not perform maintenance on connected equipment while automatic control is enabled.

---

# Zigbee actuator testing

Zigbee ON/OFF tests physically switch connected equipment.

Before pressing **ON**, confirm:

* which Zigbee device is selected,
* which endpoint is selected,
* what equipment is connected to that outlet.

For multi-outlet Zigbee devices, do not assume that endpoint numbering matches the physical outlet numbering.

Test each endpoint individually.

---

# Automatic operation

Do not immediately leave a new or modified installation unattended.

After:

* installing equipment,
* changing Zigbee bindings,
* changing environmental-control settings,
* changing schedules,
* updating firmware,
* resetting the Zigbee network,

observe the system and verify that all connected devices behave as expected.

Automatic operation should only be enabled after the complete control path has been tested.

---

# Firmware updates

Do not disconnect power while firmware is being updated.

An interrupted update may leave one of the controllers unable to start normally.

The ESP32-H2 Zigbee Controller is especially sensitive because its update process rewrites the complete firmware image.

Follow:

[Firmware Updates](firmware-update.md)

before performing an update.

---

# After configuration changes

After changing important settings, verify:

* sensor readings,
* system time,
* environmental targets,
* schedules,
* Zigbee bindings,
* actuator behavior.

A configuration that appears correct in the interface should still be physically verified before unattended operation.

---

# Sensor placement

Automatic control depends on representative measurements.

Avoid placing environmental sensors:

* directly in humidifier mist,
* immediately next to a heater,
* directly in strong fan airflow,
* against wet surfaces,
* where condensation regularly forms.

Poor sensor placement can cause the controller to react to local conditions that do not represent the overall environment.

---

# Loss of network access

Wi-Fi or internet access is not required for normal local environmental control once the controller is configured.

However, loss of browser access means the user may temporarily be unable to monitor or modify the controller remotely.

Important installations should therefore be checked locally when network connectivity is unavailable.

---

# Time-dependent control

Incorrect time or timezone configuration can cause scheduled equipment to operate at unexpected times.

After configuring or changing time settings, verify:

* local controller time,
* timezone,
* lighting schedules,
* environmental profiles,
* other scheduled functions.

---

# Suitable applications

MycoBox is intended for general environmental-control and automation applications.

Examples include:

* indoor growing,
* propagation environments,
* mushroom cultivation,
* terraria and vivaria,
* environmental experiments.

The user is responsible for determining whether the system is suitable for a specific application.

---

# Safety-critical applications

MycoBox is not designed or certified as a safety-critical control system.

Do not rely on it as the sole control or protection system for applications where failure could cause:

* serious injury,
* fire,
* dangerous overheating,
* hazardous atmospheric conditions,
* loss of critical life-support functions.

Where failure could create a dangerous condition, use independent safety mechanisms appropriate for the application.

---

# Animals and living organisms

When MycoBox is used with animals, plants, fungi or other living organisms, environmental requirements should be verified independently.

The controller only executes the configured control logic.

Incorrect targets, schedules, sensor placement or actuator assignments can create unsuitable conditions even when the controller is functioning normally.

For animal enclosures in particular, use independent safeguards for critical parameters such as temperature where appropriate.

---

# Before leaving the system unattended

Verify:

```text
[ ] Sensors report reasonable values
[ ] System time is correct
[ ] Zigbee devices are correctly identified
[ ] Endpoints have been tested
[ ] Heating switches off correctly
[ ] Humidification behaves as expected
[ ] Fans operate safely
[ ] Lighting follows the intended schedule
[ ] Electrical equipment remains dry
[ ] Connected loads are within device ratings
[ ] Independent protection is present where required
```

---

# In case of unexpected behavior

If the system behaves unexpectedly:

1. Disable or disconnect the affected equipment if it can be done safely.
2. Do not continue unattended operation.
3. Check sensor readings.
4. Check Zigbee bindings and endpoints.
5. Check control settings and schedules.
6. Review controller logs.
7. Restart equipment only after identifying the likely cause.

See:

[Troubleshooting](troubleshooting.md)

---

## Related documentation

* [Getting Started](getting-started.md)
* [Hardware Overview](hardware-overview.md)
* [Zigbee Setup](zigbee.md)
* [Firmware Updates](firmware-update.md)
* [Troubleshooting](troubleshooting.md)
