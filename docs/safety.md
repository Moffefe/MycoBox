# Safety

MycoBox starts equipment automatically. Before leaving it running, check that each appliance switches correctly and suits the conditions in your growing space.

<a id="high-humidity-environments"></a>

## Electrical safety

Match the power ratings of your plug or strip to every connected appliance. Replace damaged cables, plugs or enclosures.

Keep electrical connections away from reservoirs, direct mist and condensation. Use equipment rated for the humidity where it will operate.

## Heating equipment

Use a heater suited to the enclosure, with an independent thermostat or over-temperature cut-off. Keep this protection active alongside MycoBox.

Check [growing modes](web-interface.md#choose-the-modes) before changing them: Incubation changes the heating range and keeps Fan and Light OFF. Use separate frost protection where needed.

## Humidifiers

Keep mist away from sensors and electrical parts. Watch the first few humidification cycles: humidity can continue rising after the mist stops.

Keep the humidifier's dry-run and water-level protection active. Adjust [timing or Adaptive settings](web-interface.md#choose-the-modes) to suit the enclosure.

## Fans and moving equipment

Guard moving parts and keep loose cables, fabric and plants clear. Disconnect equipment from power before cleaning or servicing it.

## Sensor placement

Place the sensor near the area you want to monitor, away from direct mist, heaters and concentrated fan airflow.

In prolonged high humidity, compare it occasionally with a suitable reference meter. See [sensor heating and cooling](web-interface.md#sensor-heating-and-cooling) for normal pauses in readings.

<a id="zigbee-actuator-testing"></a>
<a id="growbox-warnings-and-activity-history"></a>

## Control and monitoring limits

Check the appliance as well as its socket status. An ON socket cannot tell you whether a humidifier has water or a fan is moving air. If the state is **Unknown**, inspect the equipment.

Use independent protection for conditions that could harm people, animals or equipment, such as overheating or leaks. MycoBox's [local warnings](web-interface.md#warnings) help you notice problems during routine checks.

<a id="automatic-operation"></a>
<a id="firmware-updates"></a>
<a id="after-configuration-changes"></a>
<a id="main-controller-and-zigbee-resets"></a>
<a id="related-documentation"></a>

## Configuration and maintenance

Stay nearby when changing schedules, modes or assignments: saved changes can start equipment immediately. Disconnect appliances if they need to stay OFF during the work.

Follow the guide for the task:

- [Assign or replace a Zigbee switch](zigbee.md).
- [Update firmware](firmware-update.md).
- [Restore settings](backup-restore.md).
- [Reset the Main Controller](getting-started.md#factory-reset).

If MycoBox pauses for an OFF check or update verification, complete that step before resuming automation.

<a id="loss-of-wi-fi-or-internet-access"></a>
<a id="time-dependent-control"></a>

## Connectivity and time

Automation continues locally when Wi-Fi or internet is lost. If the panel is unreachable, check the installation directly.

Check the clock and timezone after a battery or clock problem. Incorrect time shifts scheduled actions. Follow [Clock setup](getting-started.md#7-configure-time-and-localization).

<a id="safety-critical-applications"></a>
<a id="animals-and-living-organisms"></a>

## Suitable applications

Choose targets and equipment for the plants, fungi or animals in your enclosure. For animal enclosures and other situations where loss of control could cause harm, provide independent temperature protection and monitoring. MycoBox is not a life-support or emergency shutdown system.

## Before leaving the system unattended

After setup or maintenance, check that:

- [ ] Temperature and humidity readings are fresh and sensible.
- [ ] The clock, timezone, growing mode and schedule are correct.
- [ ] Each role controls the intended socket.
- [ ] Each appliance turns ON and OFF correctly.
- [ ] The equipment follows the schedule through a change of time point.
- [ ] Appliances behave as expected after power returns.
- [ ] Electrical connections stay dry and loads are within their ratings.
- [ ] Moving parts are guarded and independent protection is active.

## In case of unexpected behavior

Disconnect the affected equipment, then use [Troubleshooting](troubleshooting.md) to check the cause. Test it again before returning to unattended operation.
