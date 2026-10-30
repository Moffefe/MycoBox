# Safety

MycoBox controls environmental equipment that may operate automatically and without direct supervision.

Before using the system, make sure the connected hardware is suitable for the intended environment and installed safely.

---

# Electrical safety

MycoBox may control mains-powered equipment through one compatible paired Zigbee outlet or power strip. Separate detected outputs can be assigned to **Humidifier**, **Fan**, **Light** and **Heat**.

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

1. Verify the paired Zigbee device.
2. Verify the detected output assigned to **Heat**.
3. Test manual ON/OFF control.
4. Confirm that the heater is suitable for the intended environment.
5. Observe the system while testing automatic control.

Whenever practical, use heating equipment with its own independent over-temperature protection.

MycoBox should not be the only protection against unsafe heating conditions.

In **Fruiting**, heating uses the active scheduled temperature: ON below that value and OFF above it by 0.3 °C. **Incubation** uses a fixed 23.5–23.8 °C range and turns Fan and Light OFF. Confirm that these behaviors suit the installation before changing growing mode.

Heat requests OFF when no usable temperature reading is available or the reading is below 5 °C. This does not make MycoBox frost protection: lost communication, a stuck outlet or failed equipment can prevent a requested state from taking physical effect.

---

# Humidifiers

A humidifier can change conditions rapidly inside a small enclosure.

Before unattended operation:

* verify the correct **Humidifier** assignment,
* confirm that the humidifier switches on and off correctly,
* observe how humidity continues to change after the humidifier stops,
* avoid directing mist directly at sensors or electrical equipment.

A powerful humidifier in a small enclosure may cause significant humidity overshoot.

Sensor placement and humidifier position can strongly affect control behavior.

**Timer** runs the configured ON/OFF periods; the RH target does not regulate its output. **Adaptive** uses measurements and controlled pulses, with at least five minutes between pulse starts and at most 120 seconds per run. These limits do not guarantee a particular humidity band or prevent all overshoot. The learned response is held in memory and is learned again after a restart.

Adaptive stops an active pulse when usable ambient readings become unavailable. This behavior and the sensor's heating/cooling pauses should be checked with the actual enclosure and humidifier. Keep any independent dry-run or water-level protection supplied with the equipment; MycoBox has no water-level or leak sensor in the current configuration.

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

Before pressing **Turn ON**, confirm:

* which Zigbee device is paired,
* which detected output is selected,
* what equipment is connected to that outlet.

For multi-outlet Zigbee devices, do not assume that endpoint numbering matches physical outlet numbering.

Test each detected output individually. The interface lists discovered outputs; endpoint numbers need not be consecutive and may not match the physical outlet labels.

Whenever possible, identify endpoints using a harmless low-power load before connecting higher-power equipment.

A confirmed ON/OFF result means the controller received the expected output-state confirmation. It does not prove that the connected heater, fan or humidifier is physically operating or that a relay will remain in that state. **Unknown** is not confirmation of OFF. The quick test shows its last command result; automation may change the output again.

Changing an assignment, resetting Zigbee or preparing an H2 update requires confirmed OFF states. A failure can block the operation. Do not bypass that condition by assuming an unresponsive outlet is safe; isolate the load if necessary.

See:

[Zigbee Setup](zigbee.md)

---

# Automatic operation

Do not immediately leave a new or modified installation unattended.

After:

* installing equipment,
* changing Zigbee assignments,
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

Current ESP32-H2 web OTA writes an application package and preserves compatible Zigbee pairing and assignments. Install the required S3 update first. Full H2 recovery replaces Zigbee data and is a separate service procedure.

For H2 application OTA, keep the paired switch powered and wait for firmware, device/output and confirmed OFF verification. New ON commands remain blocked until verification completes. An interrupted update requires retrying the complete matching OTA package or service recovery; do not bypass the pause by resetting or erasing settings. Verify assignments and physical operation before unattended use. Pairing again is required after full H2 recovery or an older full-image update.

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
* Zigbee assignments,
* actuator behavior.

A configuration that appears correct in the web interface should still be physically verified before unattended operation.

Importing settings can change automation immediately, before the final restart. It can also stop after partially applying the selected sections. Review confirmed changes and the current configuration before retrying, then verify the equipment. See [Backup & restore](backup-restore.md).

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

The current SHT41 measures temperature and relative humidity. It does not measure CO₂, air quality, airflow, water level or whether a load is operating. Fan timing is not evidence that a safe atmosphere has been achieved.

The SHT41 has an automatic heater operation followed by a cooling interval. The interface shows heating or cooling while ambient measurements are paused. These operations are intended to manage sensor exposure; they do not guarantee accuracy at saturation or remove the need to check placement and compare readings with a suitable reference. Persistent high humidity and condensation require observation with the actual hardware.

---

# Growbox warnings and activity history

Growbox evaluates conditions locally even when the browser is closed. Its warnings are informational, not an independent thermostat, smoke alarm, leak alarm or emergency shutdown system.

Temperature and RH deviation warnings require 30 minutes of observed trouble. Unavailable measurements and a sustained lack of response reported by Adaptive humidification require 15 minutes. Recovery must remain stable for five minutes. A brief hazardous condition can therefore occur without a warning.

Assessment can pause during sensor heating/cooling, maintenance or missing measurements. **Assessment paused** and **Previously observed** do not describe a current all-clear. Warning observations are in memory and start again after a restart; there is no retained alarm history or remote notification service.

Growbox animations and chart activity tracks show recent confirmed output states or recorded commands. They do not independently measure heat, mist or airflow. Missing history, an uncertain state or an interval without a retained end must not be treated as proof that equipment was OFF.

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
* Zigbee assignments,
* actuator endpoints,
* automatic equipment behavior.

Resetting the Zigbee network removes the paired device and clears assignments. Pair again, save the required assignments and test outputs before returning to automatic operation. A Main Controller factory reset is a separate operation; follow its instructions rather than assuming it also resets H2.

See:

[Troubleshooting](troubleshooting.md)

---

# Before leaving the system unattended

Verify:

```text
[ ] Sensors report reasonable values
[ ] System time and timezone are correct
[ ] The paired Zigbee device is correctly identified
[ ] Detected outputs and assignments have been tested
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
4. Check Zigbee assignments and detected outputs.
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
