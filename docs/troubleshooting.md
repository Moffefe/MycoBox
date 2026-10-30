# Troubleshooting

Start with power, network access and the status shown in **Overview**, **Measurements** and **Zigbee**. Read the reported result before repeating a change. Make potentially unsafe equipment safe independently of the web interface before inspection.

## An operation result is unknown

A lost response does not establish whether a save, reset or update succeeded. Use **Reload configuration** or **Reload settings** when offered and inspect the stored state before another change.

For output tests, check the equipment: **Last test** is a command confirmation, not a continuous reading. An OFF command can be sent again. For updates, read the running version and update status using the [firmware guide](firmware-update.md#version-verification).

<a id="mycobox-is-not-available-on-the-network"></a>
<a id="mycobox-created-its-own-wi-fi-network"></a>
<a id="mycobox-does-not-connect-to-wi-fi"></a>
<a id="i-changed-wi-fi-settings-and-lost-access"></a>
## Network access problems

Check the controller's **Network** display to determine whether it joined your router or started its access point. Your browser device must be on the same network. After a settings change, allow the restart and network connection attempts to finish; the previous address may no longer apply.

An access point appearing after connection attempts indicates that MycoBox could not join the saved network. A hidden SSID or failed scan does not by itself prove the network is unavailable. Use the [Wi-Fi configuration](getting-started.md#4-configure-wi-fi) and [network recovery instructions](getting-started.md#network-recovery) for reconnection, credentials and manual SSID entry.

<a id="try-the-local-hostname"></a>
### .local does not work

If the controller's IP address opens but its `.local` hostname does not, investigate local discovery. If neither works, check the address, browser-device network and router guest-network/client isolation. See [Opening MycoBox on your network](getting-started.md#5-open-mycobox-on-your-local-network).

## I cannot log in

Check whether the administrator credentials changed and whether the browser retained an older login. The Wi-Fi password and web account are separate. Use the [login instructions](getting-started.md#3-log-in); if credentials cannot be recovered, read the [factory-reset procedure and data effects](getting-started.md#factory-reset).

## Sensor values are missing

Read the status in **Measurements**. Planned sensor heating or cooling pauses ambient samples; a communication error or an out-of-date reading needs investigation. See [sensor status meanings](web-interface.md#sensor-heating-and-cooling).

If the page is updating but fresh samples do not return, check sensor power and connections against the [hardware requirements](compatibility.md#environmental-sensors). If all page data is stale, investigate the browser/network connection first. An old chart point is not a current reading.

## Sensor values look incorrect

Compare a fresh ambient reading with a suitable reference. Direct mist, condensation, a nearby heater or concentrated airflow can make the sensor unrepresentative of the chamber. Check [sensor placement](safety.md#sensor-placement) before changing control targets.

## CO₂ is not shown

The configured sensor does not measure CO₂. See [supported sensors](compatibility.md#environmental-sensors); fan activity alone does not indicate CO₂ concentration.

## Humidity oscillates around the target

Compare RH with **Humidifier** and **Fan** activity in Measurements. Air exchange can lower RH, while moisture can continue affecting the chamber after the humidifier stops.

Check the active [humidification mode and its limits](web-interface.md#choose-the-modes), sensor placement, water supply and the humidifier's actual response. Observe the chamber before making repeated adjustments.

<a id="humidifier-does-not-switch-on"></a>
<a id="fan-light-or-heating-does-not-switch"></a>
## An output does not operate

Check the saved role assignment, assignment conflicts, communication status and any [maintenance pause](#zigbee-maintenance-remains-active). A role with no assignment cannot operate equipment.

Use the [output test procedure](zigbee.md#testing-a-device) to distinguish switching/communication problems from automation settings. A confirmed output does not prove that an appliance has water, resumes after power switching or physically operates.

If manual switching works, compare **Overview** with the active mode, cycle day, time point and local time. Incubation, disabled lighting, unavailable measurements or an Adaptive waiting period can explain an inactive output; see [Cycle and automation](web-interface.md#cycle-and-automation).

## Zigbee device does not appear

Distinguish **controller unavailable**, a pairing failure and an output-discovery failure. Check the switch's power, distance and manufacturer's pairing state. A device that joined but could not be read is different from one reported as incompatible.

Check [device compatibility](compatibility.md#zigbee-actuator-compatibility) and follow [pairing](zigbee.md#pairing-a-new-zigbee-device). An existing paired device occupies the available slot; replacing it requires the intentional [network reset](zigbee.md#resetting-the-zigbee-network).

## Zigbee device appears but cannot be controlled

Check whether the intended output was discovered and whether the [test result](zigbee.md#testing-a-device) is confirmed. Disabled **Turn ON** may indicate maintenance, rather than a failed switch.

If discovery is incomplete or commands remain unconfirmed, investigate device power, range and compatibility before changing automation settings. Keep the page's **Technical details** for a report.

<a id="a-multi-outlet-zigbee-device-controls-the-wrong-outlet"></a>
<a id="an-assignment-cannot-be-saved-or-removed"></a>
## An assignment is wrong or cannot be saved

A printed socket number may differ from its detected endpoint. Check the [identified output mapping](zigbee.md#understanding-endpoints).

A rejected save can mean a duplicate role output, an undetected output, an unreachable old assignment or unconfirmed OFF. Read the error and compare the stored assignment with the paired device. Use the [assignment procedure](zigbee.md#binding-devices-to-mycobox-functions), including its OFF requirements. If the result is uncertain, reload settings before another save.

## Zigbee maintenance remains active

Read the update status and assignment state to identify the pause:

| Observed state | Next guide |
| --- | --- |
| Network reset completed; assignments cleared | [Restore assignments after maintenance](zigbee.md#restoring-assignments-after-maintenance) |
| H2 update interrupted or still verifying | [Complete or retry H2 OTA](firmware-update.md#if-an-h2-update-is-interrupted) |

A restart does not release either pause. Do not use repeated resets or erase settings to bypass it.

<a id="a-zigbee-device-disappeared-after-an-h2-firmware-update"></a>
## Zigbee Controller firmware update failed

Check the error and update phase. A preparation failure means programming was blocked. **Firmware written** can still mean verification is waiting for the original switch or its outputs; check that it is powered and reachable rather than assuming its settings were erased.

An interrupted write can leave H2 unavailable. Read the [H2 completion and retry conditions](firmware-update.md#if-an-h2-update-is-interrupted) before another upload. If the installation used an older full-image update or recovery, check the [data effects](firmware-update.md#what-happens-to-settings) instead.

## Main Controller firmware update failed

Record the error and whether S3 still starts normally. A rejected or incomplete upload alone does not establish that recovery is required. Follow [S3 update failure guidance](firmware-update.md#if-the-main-controller-update-fails).

## Firmware file is rejected

Compare the file's intended controller, package format, checksum and required updater version with the [firmware file guide](firmware-update.md#firmware-files). Renaming the file does not change its format.

## A settings import stopped or failed

Read which sections the dialog confirmed. A failed import can leave completed writes applied; it is not evidence that all changes were rolled back.

The error may identify unsaved local cycle edits, missing credentials, mismatched Zigbee assignments or pending H2 OTA. Use [import failure and unknown-result guidance](backup-restore.md#if-import-stops-or-the-result-is-unknown) before retrying.

## The controller restarted during normal use

Once access returns, inspect fresh measurements, Zigbee status, saved settings and equipment. If unexpected restarts repeat, note their timing, check supply stability and review **Activity log** and **System → Diagnostics**. Distinguish an expected settings/import restart from an unexplained one.

<a id="the-displayed-time-is-incorrect"></a>
<a id="a-schedule-activates-at-the-wrong-time"></a>
## Time or scheduled transitions are wrong

Compare **Controller local time**, timezone, active cycle day, time point and light window. A correct schedule can run at the wrong time if the clock or timezone is wrong.

If automatic synchronization is selected, check time-server reachability. For manual entry, check whether local time was mistakenly entered as UTC. Use [time configuration](getting-started.md#7-configure-time-and-localization) to correct it.

## Configuration changes appear to have no effect

Read back the stored value after a confirmed save. Compare saved and pending cycle state, and check whether a subsequent restart discarded an unsaved edit. Use [cycle editing and saving](web-interface.md#edit-and-save-a-schedule) or [assignment saves](zigbee.md#binding-devices-to-mycobox-functions), as appropriate.

<a id="factory-reset"></a>
<a id="after-a-main-controller-factory-reset"></a>
<a id="main-controller-factory-reset-vs-zigbee-reset"></a>
<a id="forget-paired-devices-was-used-accidentally"></a>
<a id="reset-network-was-used-accidentally"></a>
## Diagnose configuration after a reset

Check which reset occurred before rebuilding configuration. An S3 factory reset can leave the H2 device paired while S3 assignments are missing; a Zigbee network reset requires network and assignment restoration. A restart alone does not undo either reset.

Use the [Main Controller reset and setup instructions](getting-started.md#factory-reset) or [Zigbee restoration procedure](zigbee.md#restoring-assignments-after-maintenance). A [settings backup](backup-restore.md) can help restore selected S3 configuration, but cannot recreate H2 pairing.

<a id="before-leaving-the-system-unattended"></a>
## Still having problems?

Complete the [equipment checks](safety.md#before-leaving-the-system-unattended) before returning to unattended use.

For a report, include both controllers' version/build, switching-device model, exact error or **Technical details**, reproduction steps and what changed immediately beforehand. [Export diagnostics](backup-restore.md#export-diagnostics) can collect retained evidence in one ZIP.

Review the report for private information before sharing; follow the [security policy](../SECURITY.md) for sensitive reports.

<a id="related-documentation"></a>
[Documentation](README.md) · [Web interface](web-interface.md) · [Safety](safety.md)
