# Safety

MycoBox can start environmental equipment automatically. Choose hardware and environmental targets appropriate to the installation, and verify physical operation before relying on control.

<a id="high-humidity-environments"></a>

## Electrical safety

Follow the voltage, current, power and operating limits of both the switching device and every connected load. Do not use damaged plugs, cables, connectors or enclosures.

Keep the controller, mains connections and equipment dry unless specifically rated for the conditions. Protect them from reservoirs, humidifier outlets, direct mist, wet surfaces and condensation paths. Equipment intended for ordinary indoor use may be unsuitable for a continuously humid enclosure.

## Heating equipment

Use heating equipment suitable for the enclosure, with independent over-temperature protection wherever practical. A configuration mistake, stuck relay or communication failure can leave a heater in an unintended state; MycoBox must not be its only protection.

Growing modes change heating behavior, and Incubation also turns Fan and Light OFF. Review [mode behavior](web-interface.md#choose-the-modes) before changing it. Software requests to stop heating when readings are unusable do not guarantee physical OFF or provide frost protection.

## Humidifiers

Mist output can change a small enclosure rapidly, and RH may continue rising after the humidifier stops. Observe both the response and the overshoot with the actual equipment. Keep mist away from sensors and electrical parts.

Retain the equipment's independent dry-run and water-level protection. MycoBox's timing and Adaptive limits do not guarantee a humidity band or prevent every overshoot; see [humidification modes](web-interface.md#choose-the-modes).

## Fans and moving equipment

Fans may start automatically. Keep fingers, loose cables, fabric, plants and substrate clear of moving parts. Safely disconnect or isolate equipment before servicing it; changing a software setting is not electrical isolation.

## Sensor placement

Place the sensor where it represents the space occupied by the monitored plants, fungi, animals or other subjects. Avoid direct mist, nearby heaters, strong local fan airflow, wet surfaces and areas where condensation regularly forms. Otherwise control can respond to a local extreme rather than the enclosure as a whole.

Compare readings with a suitable reference in prolonged high humidity. Sensor-heater operation does not guarantee accuracy at saturation or compensate for poor placement. [Sensor states](web-interface.md#sensor-heating-and-cooling) explain planned measurement pauses.

<a id="zigbee-actuator-testing"></a>

<a id="growbox-warnings-and-activity-history"></a>

## Control and monitoring limits

An ON/OFF acknowledgement confirms the switching output, not physical airflow, mist, heat delivery or continued relay operation. **Unknown** is not proof of OFF. Missing activity history is not proof that equipment was stopped, and automation may change an output after a manual test.

Growbox warnings are informational. Delayed or paused assessment, lost communication and cleared history can leave a hazardous condition without a warning. The interface is not an independent thermostat, smoke alarm, leak alarm or emergency shutdown system. See [warnings and status](web-interface.md#overview-and-growbox).

Fan timing does not prove a safe atmosphere. Provide independent monitoring and protection for any parameter essential to the installation.

<a id="automatic-operation"></a>

<a id="firmware-updates"></a>

<a id="after-configuration-changes"></a>

<a id="main-controller-and-zigbee-resets"></a>

<a id="related-documentation"></a>

## Configuration and maintenance

Changes to targets, schedules, modes or assignments can operate connected equipment immediately. Import can leave partially applied settings. Firmware work and resets can interrupt automation or change retained configuration. Keep loads safe and supervised throughout these operations, then use the checklist below.

Use the relevant procedure rather than bypassing a refused operation:

- [Zigbee setup](zigbee.md) for output identification, assignment changes and network reset.
- [Firmware updates](firmware-update.md) for OTA, verification and recovery.
- [Backup and restore](backup-restore.md) for selected imports and partial results.
- [Main Controller reset](getting-started.md#factory-reset) for its separate recovery procedure.

A required OFF confirmation or maintenance pause is not evidence that an unresponsive load is safe. Isolate the load when needed; do not erase or reset settings to bypass a block.

<a id="loss-of-wi-fi-or-internet-access"></a>

<a id="time-dependent-control"></a>

## Connectivity and time

Automation runs locally and can continue without internet or an open browser. A lost Wi-Fi connection can still prevent you from checking or changing it, so browser access must not be the only safety mechanism. Inspect the installation locally when necessary.

Incorrect clock or timezone settings can trigger scheduled equipment at unexpected times. Check time after configuration, battery or power problems; use [time setup](getting-started.md#7-configure-time-and-localization) for the procedure.

<a id="safety-critical-applications"></a>

<a id="animals-and-living-organisms"></a>

## Suitable applications

MycoBox supports general environmental automation such as growing enclosures, propagation, mushroom cultivation, terraria and experiments. It cannot determine whether targets or equipment suit a species or application.

It is not designed or certified as a safety-critical system. Never rely on it as the sole control or protection where failure could cause injury, fire, dangerous overheating, hazardous atmospheric conditions or loss of life support. Animal enclosures in particular need independent safeguards for critical conditions.

Use appropriate independent thermostats, thermal cut-offs, over-current protection, equipment safety limits and separate monitoring or alarms.

## Before leaving the system unattended

Use this checklist after installing or servicing equipment, changing configuration, importing settings, updating firmware or resetting either controller:

- [ ] Sensor values are reasonable and representative; current readings are usable.
- [ ] Controller time, timezone, modes, targets and active schedule are correct.
- [ ] The intended device and physical outputs have been identified and tested using [Zigbee setup](zigbee.md).
- [ ] Saved assignments operate the intended loads, and required maintenance verification has finished.
- [ ] Heating turns OFF correctly; humidification, ventilation and lighting behave as intended through scheduled transitions.
- [ ] Equipment behavior after power restoration is understood.
- [ ] Electrical equipment stays dry and all loads remain within ratings.
- [ ] Moving parts are guarded and appropriate independent protection is present.

## In case of unexpected behavior

Safely disconnect or isolate affected equipment and stop unattended operation. Check measurements, assignments, settings and logs using [Troubleshooting](troubleshooting.md). Resume only after the cause and physical behavior have been checked.
