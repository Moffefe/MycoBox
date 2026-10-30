# Troubleshooting

Find the symptom below and start with its checks. If equipment behaves unexpectedly, disconnect it before inspecting it.

## Find your symptom

| What you see | Start here |
| --- | --- |
| The panel will not open or Wi-Fi changed | [Network access](#network-access-problems) |
| The panel opens but login fails | [Account access](#i-cannot-log-in) |
| Readings are missing, seem wrong or humidity swings | [Missing readings](#sensor-values-are-missing) · [Incorrect readings](#sensor-values-look-incorrect) · [Humidity](#humidity-oscillates-around-the-target) |
| Equipment does not run or the wrong socket switches | [Output operation](#an-output-does-not-operate) · [Assignments](#an-assignment-is-wrong-or-cannot-be-saved) |
| Zigbee pairing fails or maintenance stays active | [Pairing](#zigbee-device-does-not-appear) · [Control](#zigbee-device-appears-but-cannot-be-controlled) · [Maintenance](#zigbee-maintenance-remains-active) |
| An update fails or its file is rejected | [Main Controller](#main-controller-firmware-update-failed) · [Zigbee Controller](#zigbee-controller-firmware-update-failed) · [Rejected file](#firmware-file-is-rejected) |
| A save, import or reset has an unclear result | [Unknown result](#an-operation-result-is-unknown) · [Import](#a-settings-import-stopped-or-failed) · [After a reset](#diagnose-configuration-after-a-reset) |
| Timing is wrong, changes disappear or restarts repeat | [Time](#time-or-scheduled-transitions-are-wrong) · [Saved settings](#configuration-changes-appear-to-have-no-effect) · [Restarts](#the-controller-restarted-during-normal-use) |

## An operation result is unknown

The browser lost confirmation of the result. Choose **Reload configuration** or **Reload settings**, then check what was saved before trying again.

For an output test, check the appliance itself; you can send OFF again. For an update, check the [installed version and update status](firmware-update.md#version-verification).

<a id="mycobox-is-not-available-on-the-network"></a>
<a id="mycobox-created-its-own-wi-fi-network"></a>
<a id="mycobox-does-not-connect-to-wi-fi"></a>
<a id="i-changed-wi-fi-settings-and-lost-access"></a>

## Network access problems

1. Check the IP address on the controller's **Network** display.
2. Connect your phone or computer to the same network.
3. Open the displayed address in your browser.

After changing Wi-Fi settings, allow several minutes for reconnection. If MycoBox starts its own access point, follow [Network recovery](getting-started.md#network-recovery) to correct the network name or password. You can [enter a hidden network manually](getting-started.md#4-configure-wi-fi).

<a id="try-the-local-hostname"></a>

### .local does not work

Use the IP address from the **Network** display. If the IP works, you can keep using it.

If neither address works, check that both devices are on the same network. A router's guest-network or device-isolation setting can block access between them. See [Opening MycoBox](getting-started.md#5-open-mycobox-on-your-local-network).

## I cannot log in

Use the administrator account, which is separate from the Wi-Fi password. Check whether it was changed or your browser is using an old saved login.

Follow the [login steps](getting-started.md#3-log-in). If you cannot recover the account, the [factory-reset guide](getting-started.md#factory-reset) explains how to start again and which settings are removed.

## Sensor values are missing

Check the message in **Measurements**. **Sensor cooling after heating** normally lasts three minutes; readings return afterwards.

If the page updates but readings remain missing, check sensor power and connections. If the whole page has stopped updating, reconnect to MycoBox first.

See [sensor states](web-interface.md#sensor-heating-and-cooling) and [supported sensors](compatibility.md#environmental-sensors).

## Sensor values look incorrect

Check that the reading is fresh, then compare it with another suitable thermometer or humidity meter.

Move the sensor away from direct mist, heaters and concentrated airflow. Follow [sensor placement](safety.md#sensor-placement) before changing your targets.

## CO₂ is not shown

The SHT41 measures temperature and humidity. CO₂ measurement is a [planned addition](roadmap.md#co₂-based-ventilation-control).

## Humidity oscillates around the target

Compare humidity with the **Humidifier** and **Fan** tracks in Measurements. Ventilation can lower humidity, and mist can keep raising it for a while after the humidifier stops.

Check the humidifier's water supply, sensor position and [selected humidification mode](web-interface.md#choose-the-modes). Change one setting at a time and watch the response before adjusting again.

<a id="humidifier-does-not-switch-on"></a>
<a id="fan-light-or-heating-does-not-switch"></a>

## An output does not operate

1. In **Zigbee**, check that the role has a saved output and no assignment conflict or [maintenance pause](#zigbee-maintenance-remains-active).
2. Run an [ON/OFF test](zigbee.md#testing-a-device).
3. If the socket switches but the appliance does not run, check its own controls, power and water supply.
4. If the manual test works, check the active day, time point, local time and mode in **Overview**.

Incubation keeps Fan and Light OFF. Disabled lighting, missing readings or Adaptive's waiting period can also explain a stopped output. See [Cycle and automation](web-interface.md#cycle-and-automation).

## Zigbee device does not appear

Check that the plug or strip is powered and near MycoBox. Start pairing in the panel, then put the device into its own pairing mode.

A **discovery error** means MycoBox could not read its outputs; retry after checking power and range. **Incompatible device** means no supported outputs were found.

Use [Pairing](zigbee.md#pairing-a-new-zigbee-device) and [Compatibility](compatibility.md#zigbee-actuator-compatibility). If another device is already paired, [reset the network](zigbee.md#resetting-the-zigbee-network) before replacing it.

## Zigbee device appears but cannot be controlled

Select a detected output and run an [ON/OFF test](zigbee.md#testing-a-device). If commands are not confirmed, check the device's power, distance and compatibility.

If **Turn ON** is disabled, check [maintenance status](#zigbee-maintenance-remains-active). Keep the displayed error and **Technical details** if you need help.

<a id="a-multi-outlet-zigbee-device-controls-the-wrong-outlet"></a>
<a id="an-assignment-cannot-be-saved-or-removed"></a>

## An assignment is wrong or cannot be saved

Socket labels can differ from the panel's output numbers. [Test the mapping](zigbee.md#understanding-endpoints) and give each role a different detected output.

Changing an assignment requires OFF confirmation from its old and new outputs. Restore power or communication to an unreachable switch, then retry. For an unknown result, reload settings first.

Follow [Saving assignments](zigbee.md#binding-devices-to-mycobox-functions).

## Zigbee maintenance remains active

Open **Zigbee** and check what needs finishing:

| Status | What to do |
| --- | --- |
| Network reset completed; assignments cleared | [Restore an assignment](zigbee.md#restoring-assignments-after-maintenance) |
| H2 update interrupted or still verifying | [Complete the update](firmware-update.md#if-an-h2-update-is-interrupted) |

Both pauses remain after a restart. Complete the indicated step to resume automation.

<a id="a-zigbee-device-disappeared-after-an-h2-firmware-update"></a>

## Zigbee Controller firmware update failed

Read the update status. If preparation failed, installation has not started. If firmware was written but verification is waiting, check that the original plug or strip is powered and reachable.

Follow [H2 update recovery](firmware-update.md#if-an-h2-update-is-interrupted). For an older full-image update, check [whether pairing needs restoring](firmware-update.md#what-happens-to-settings).

## Main Controller firmware update failed

If the panel opens, note the error and follow [Main Controller update checks](firmware-update.md#if-the-main-controller-update-fails). For an unknown result, check the installed version before another upload.

## Firmware file is rejected

Check that you chose the correct **S3-OTA** or **H2-OTA** file and downloaded it completely. Compare its checksum and the required versions with the [firmware guide](firmware-update.md#firmware-files).

## A settings import stopped or failed

Check which sections were saved. Completed sections stay applied.

Choose **Read current settings** and correct the reported problem, such as a missing password, unmatched Zigbee assignment or unfinished update. Then follow [Import recovery](backup-restore.md#if-import-stops-or-the-result-is-unknown).

## The controller restarted during normal use

Some settings changes and imports restart MycoBox automatically.

For unexpected or repeated restarts, check the power supply and note when they happen. Once the panel opens, review **Activity log**, **System → Diagnostics**, readings and saved settings.

<a id="the-displayed-time-is-incorrect"></a>
<a id="a-schedule-activates-at-the-wrong-time"></a>

## Time or scheduled transitions are wrong

Check **Controller local time**, timezone, active cycle day and time point.

In Automatic mode, check the network connection to the time server. In Manual mode, use **Use computer time** to avoid entering local time in the UTC field. Follow [Clock setup](getting-started.md#7-configure-time-and-localization).

## Configuration changes appear to have no effect

For a schedule, **Apply changes** updates the running cycle, while **Save cycle** keeps it after restart. For an output assignment, use that role's own **Save** button.

Reload the panel and check the stored values. See [Saving a cycle](web-interface.md#edit-and-save-a-schedule) or [Saving assignments](zigbee.md#binding-devices-to-mycobox-functions).

<a id="factory-reset"></a>
<a id="after-a-main-controller-factory-reset"></a>
<a id="main-controller-factory-reset-vs-zigbee-reset"></a>
<a id="forget-paired-devices-was-used-accidentally"></a>
<a id="reset-network-was-used-accidentally"></a>

## Diagnose configuration after a reset

- **Main Controller factory reset:** repeat [initial setup](getting-started.md#factory-reset). The switch may still be paired; restore its assignments.
- **Zigbee network reset:** [pair the switch and restore assignments](zigbee.md#restoring-assignments-after-maintenance).
- **Ordinary restart:** saved configuration stays in place; unsaved cycle edits are lost.

A [settings backup](backup-restore.md) helps restore configuration and assignments once the matching switch is paired.

<a id="before-leaving-the-system-unattended"></a>

## Still having problems?

[Report a bug](https://github.com/Moffefe/MycoBox/issues/new?template=bug-report.yml), [ask about setup](https://github.com/Moffefe/MycoBox/issues/new?template=setup-question.yml), or [suggest a guide correction](https://github.com/Moffefe/MycoBox/issues/new?template=documentation-feedback.yml).

Include the two firmware versions, switch model, error message, what you did and what happened. [Export diagnostics](backup-restore.md#export-diagnostics) can collect useful information before a restart.

Remove private details before sharing. For a security issue, use the [private reporting steps](../SECURITY.md#reporting-a-vulnerability).

Once the problem is resolved, check [equipment operation](safety.md#before-leaving-the-system-unattended) before leaving MycoBox running.

<a id="related-documentation"></a>

[Documentation](README.md) · [Web interface](web-interface.md) · [Safety](safety.md)
