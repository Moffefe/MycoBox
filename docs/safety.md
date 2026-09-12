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

Always follow the electrical ratings and installation requirements of both the switching device and the connected equipment.

Do not exceed:

* maximum voltage,
* maximum current,
* maximum power,
* manufacturer operating limits.

Do not use damaged plugs, cables, connectors, enclosures or switching devices.

---

# High-humidity environments

Some MycoBox applications may operate in environments with elevated humidity.

Electrical equipment should not be exposed to condensation, standing water or direct mist unless it is specifically designed for those conditions.

Keep mains-voltage devices and connections away from:

* water reservoirs,
* humidifier outlets,
* direct mist,
* condensation paths,
* wet surfaces.

Position the controller and power connections where they remain dry during normal operation.

Do not assume that equipment suitable for normal indoor use is also suitable for a continuously humid enclosure.

---

# Heating equipment

Heating devices require particular care because incorrect configuration or failed switching equipment can create unsafe temperatures.

Before enabling automatic heating:

1. Verify the correct Zigbee device.
2. Verify the correct endpoint.
3. Test manual ON/OFF control.
4. Confirm that the heater is suitable for the intended environment.
5. Observe the system while testing automatic control.

Whenever practical, use heating equipment with its own independent over-temperature protection.

MycoBox should not be the only protection against unsafe heating conditions.

---

# Humidifiers

A humidifier can change conditions rapidly inside a small enclosure.

Before unattended operation:

* verify the correct Zigbee binding,
* confirm that the humidifier switches on and off correctly,
* observe how humidity continues to change after the humidifier stops,
* avoid directing mist directly at sensors or electrical equipment.

A powerful humidifier in a small enclosure may cause significant humidity overshoot.

Sensor placement and humidifier position can strongly affect control behavior.

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

Disconnect or safely isolate equipment before working on moving components.

---

# Zigbee actuator testing

Zigbee ON/OFF tests physically switch connected equipment.

Before pressing **ON**, confirm:

* which Zigbee device is selected,
* which endpoint is selected,
* what equipment is connected to that outlet.

For multi-outlet Zigbee devices, do not assume that endpoint numbering matches physical outlet numbering.

Test each endpoint individually.

Whenever possible, identify endpoints using a harmless low-power load before connecting higher-power equipment.

See:

[Zigbee Setup](zigbee.md)

---

# Automatic operation

Do not immediately leave a new or modified installation unattended.

After:

* installing equipment,
* changing Zigbee bindings,
* changing environmental-control settings,
* changing schedules,
* changing environmental profiles,
* updating firmware,
* performing a Main Controller factory reset,
* resetting the Zigbee network,

observe the system and verify that all connected devices behave as expected.

Automatic operation should only be relied on after the complete control path has been tested.

---

# Firmware updates

Firmware updates temporarily interrupt normal environmental control.

Do not disconnect power while firmware is being updated.

An interrupted update may leave one of the controllers unable to start normally.

The ESP32-H2 Zigbee Controller requires particular care because its update procedure rewrites the complete firmware image.

After an ESP32-H2 update, Zigbee devices must be paired again and actuator bindings should be verified before unattended operation resumes.

See:

[Firmware Updates](firmware-update.md)

---

# After configuration changes

After changing important settings, verify:

* sensor readings,
* system time,
* environmental targets,
* schedules,
* environmental profiles,
* Zigbee bindings,
* actuator behavior.

A configuration that appears correct in the web interface should still be physically verified before unattended operation.

---

# Sensor placement

Automatic control depends on representative measurements.

Avoid placing environmental sensors:

* directly in humidifier mist,
* immediately next to a heater,
* directly in strong fan airflow,
* against wet surfaces,
* where condensation regularly forms.

Poor sensor placement can cause the controller to react to local conditions that do not represent the overall controlled environment.

Where possible, place sensors where they measure conditions representative of the space occupied by the plants, fungi, animals or other monitored subjects.

---

# Loss of Wi-Fi or internet access

Normal environmental-control logic runs locally on MycoBox.

Loss of internet access does not stop normal local automation.

Loss of Wi-Fi connectivity may prevent access to the web interface until the network connection is restored or MycoBox returns to Access Point mode.

Important installations should therefore not rely solely on remote browser access as a safety mechanism.

If network access is lost, verify the installation locally when necessary.

---

# Time-dependent control

Incorrect time or timezone configuration can cause scheduled equipment to operate at unexpected times.

After configuring or changing time settings, verify:

* local controller time,
* timezone,
* lighting schedules,
* environmental profiles,
* other scheduled functions.

Incorrect time settings may affect control even when the rest of the controller is functioning normally.

---

# Suitable applications

MycoBox is intended for general environmental-control and automation applications.

Examples include:

* indoor growing,
* propagation environments,
* mushroom cultivation,
* terraria and vivaria,
* environmental experiments.

The user is responsible for determining whether MycoBox and the connected equipment are suitable for a specific application.

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

Examples may include:

* independent thermostats,
* thermal cut-offs,
* over-current protection,
* equipment with built-in safety limits,
* separate monitoring or alarm systems.

---

# Animals and living organisms

When MycoBox is used with animals, plants, fungi or other living organisms, environmental requirements should be verified independently.

The controller executes the configured control logic but cannot determine whether the selected environmental targets are appropriate for a particular species or application.

Incorrect targets, schedules, sensor placement or actuator assignments can create unsuitable conditions even when MycoBox itself is functioning normally.

For animal enclosures in particular, use independent safeguards for critical parameters such as temperature where appropriate.

---

# Main Controller and Zigbee resets

MycoBox contains two independent controllers.

A Main Controller factory reset and a Zigbee network reset are different operations.

After either operation, verify:

* network configuration,
* environmental-control settings,
* Zigbee device availability,
* Zigbee bindings,
* actuator endpoints,
* automatic equipment behavior.

Do not assume that previous actuator assignments remain valid after rebuilding the Zigbee network.

See:

[Troubleshooting](troubleshooting.md)

---

# Before leaving the system unattended

Verify:

```text
[ ] Sensors report reasonable values
[ ] System time and timezone are correct
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

# Related documentation

* [Getting Started](getting-started.md)
* [Hardware Overview](hardware-overview.md)
* [Zigbee Setup](zigbee.md)
* [Firmware Updates](firmware-update.md)
* [Troubleshooting](troubleshooting.md)
