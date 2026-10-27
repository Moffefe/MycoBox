# Troubleshooting

Start by checking power, network access, **Overview**, **Measurements** and **Zigbee**. Read the displayed result before repeating a change. If equipment could be in an unsafe state, make it safe independently of the web interface before inspecting it.

## An operation result is unknown

A lost response does not establish whether a save, reset or update succeeded. If MycoBox asks for **Reload configuration** or **Reload settings**, reload and inspect the stored state before another change. Do not repeatedly press Save or Reset to resolve an uncertain result.

For an output test, check the actual equipment. An OFF command can be sent again when the output remains available. A **Last test** result is only the last command confirmation; automation may subsequently change the output.

For an update, reconnect and check the reported firmware version before retrying. See [Firmware Updates](firmware-update.md).

## MycoBox is not available on the network

Check whether MycoBox is connected to your normal Wi-Fi network or has created its own access point.

### Try the local hostname

When connected to your normal network, try `http://<controller-name>.local`. Make sure your phone or computer is on the same network and use HTTP.

### .local does not work

Find MycoBox's IP address in your router or on the controller's local display and open it directly, for example `http://192.168.1.120`. A working IP address with a failing hostname points to local discovery or network configuration. Check guest-network/client isolation if devices cannot reach one another.

## MycoBox created its own Wi-Fi network

Look for `<controller-name>_AP`. Connect using the access-point credentials in [Getting Started](getting-started.md), and keep your phone or computer on that network even if it reports no Internet access.

Open the AP address described in Getting Started, or the gateway/IP shown by the connected device or controller. Then open **System → Network** and correct the saved Wi-Fi settings. Do not assume that the normal network hostname or router-assigned IP also works in AP mode.

## MycoBox does not connect to Wi-Fi

Under **System → Network**, check the selected network and its password. Use **Refresh** to scan. If scanning fails or the network is hidden, choose **Other / hidden network…** and enter its name manually.

**Keep the password for the saved network** applies to the saved SSID. For a new secured network, enter its password. Saving restarts the controller.

## I changed Wi-Fi settings and lost access

Allow the restart to finish, reconnect your browser device to the same network and try the controller's hostname or new IP. If connection to the configured network fails, check for its `_AP` network and correct the settings there. See [Getting Started](getting-started.md).

## I cannot log in

Use your configured administrator credentials. For an unchanged installation, refer to the initial credentials in [Getting Started](getting-started.md).

The account is configured under **System → Administrator account**; the **Account** shortcut opens that section. After changing credentials, sign in with the new values. If the credentials are lost and normal access cannot be restored, a [Main Controller factory reset](#factory-reset) clears saved configuration; read its consequences first.

## Sensor values are missing

Open **Measurements** and read the status beside the values. The installed SHT41 provides temperature and relative humidity.

| Status | What to check |
| --- | --- |
| **Sensor heater active** | Ambient readings are temporarily paused during the sensor's own heating cycle. This is separate from the **Heat** equipment output. |
| **Sensor cooling after heating** | Wait for ambient readings to resume automatically. |
| **Reading is out of date** or no fresh reading | Check whether the browser connection is working and whether fresh readings return. |
| **Sensor communication error** | MycoBox retries automatically. If the condition persists, check sensor power and connections using the hardware guidance. |

Make equipment safe before opening the enclosure or checking wiring. Do not treat an old chart value as a current measurement. See [Hardware Overview](hardware-overview.md) and [Compatibility](compatibility.md).

## Sensor values look incorrect

Check the sensor's placement. Direct humidifier mist, condensation, a nearby heater or concentrated fan airflow can make its reading unrepresentative of the growing space. Compare conditions after a fresh ambient reading, rather than during sensor heating or cooling.

## CO₂ is not shown

The SHT41 configuration measures temperature and humidity, not CO₂. **Fan** uses its configured ON/OFF timing; it does not regulate CO₂ concentration.

## Humidity oscillates around the target

Open **Measurements** and compare the humidity curve with the **Humidifier** and **Fan** event tracks. Air exchange can lower humidity, and moisture can continue affecting a chamber after the humidifier switches off.

Under **Cycle & automation**, check whether **Timer** or **Adaptive** humidification is selected. Timer uses ON/OFF durations; Adaptive uses the humidity target and fresh measurements. Review sensor placement, water supply, the connected humidifier and the selected settings before making repeated adjustments.

Observe the chamber’s own readings and equipment response before adjusting the settings again.

## Humidifier does not switch on

1. On **Zigbee**, check that the device is available and **Humidifier** has the intended distinct output saved.
2. Check for maintenance, an assignment conflict or an unknown operation result. During maintenance, follow the [assignment restoration procedure](zigbee.md#restoring-assignments-after-maintenance) first; disabled **Turn ON** is expected until a new assignment is saved.
3. Identify the output with **Test output** and confirm physical **Turn ON / Turn OFF** operation.
4. Check the selected humidification mode and active time point under **Cycle & automation**.
5. For Adaptive mode, check that fresh measurements are available and allow time for the chamber to respond between corrections.

Manual testing can operate real equipment. A successful test does not replace checking the automatic mode and the physical water supply.

## Fan, light or heating does not switch

First check the saved **Fan**, **Light** or **Heat** assignment and test its detected output on **Zigbee**. A role without an assignment cannot operate equipment. If maintenance is active, restore an initial assignment safely before ON tests as described below.

If manual switching works, inspect **Cycle & automation** and **Overview**:

- **Incubation** keeps Fan and Light OFF and uses a fixed heating range instead of the daily temperature target.
- In **Fruiting**, Fan follows its timing settings. Light also needs its schedule enabled and the current time to be inside the light window.
- Heating depends on the current measurement and the applicable thresholds shown in Overview.

Check the controller's local time and timezone if equipment follows the wrong part of the schedule.

## Zigbee device does not appear

Open **Zigbee**, wait for **Zigbee controller available**, select **Start pairing**, then put the device in pairing mode. The window lasts 120 seconds and can be closed using **Cancel pairing**.

Select **Refresh** to read the device again. If pairing or discovery fails, follow the message, check the device's manufacturer's pairing/reset procedure and try nearer the controller. MycoBox accepts one compatible ON/OFF switch or power strip, not several separate plugs or Zigbee sensors.

If a device is already paired, a second cannot be added. Replacing it requires the intentional [Zigbee network reset](zigbee.md#forgetting-all-zigbee-devices), including successful OFF preparation.

## Zigbee device appears but cannot be controlled

Use **Test output → Output** to select a detected output, then **Turn ON** and **Turn OFF**. During maintenance, disabled **Turn ON** is expected; restore an initial intended assignment before testing, with the loads kept safe. Do not guess endpoint 1 or a fixed range: MycoBox discovers up to 32 ON/OFF outputs with endpoint numbers 1–240, which may be nonconsecutive.

Check the physical equipment and read the confirmation. If output discovery is unavailable or a command is not confirmed, restore communication and investigate compatibility before changing the automation settings. Expand **Technical details** if offered and keep the error for a problem report.

See [Zigbee Setup](zigbee.md) and [Compatibility](compatibility.md).

## A multi-outlet Zigbee device controls the wrong outlet

The device manufacturer determines endpoint numbering. Test each detected output to identify its actual socket, finish with confirmed OFF, then select that output in the appropriate role's **Assigned output** list and **Save**.

## An assignment cannot be saved or removed

Each role needs a different detected output on the paired device. An output assigned elsewhere cannot be reused by another role.

Changing or removing an assignment requires confirmed OFF on its previous output. A new output must also confirm OFF before being saved. If the old device/output cannot be reached, restore communication before retrying. Selecting **Not assigned** does not bypass the OFF requirement.

If the save result is unknown, use **Reload settings** and read the stored assignment before another attempt.

## Zigbee maintenance remains active

A network reset or H2 update can clear assignments and leave maintenance active. New ON commands remain blocked until the first new assignment is successfully saved. This state survives a Main Controller restart.

Reload **Zigbee** and check the device and firmware state. Keep the controlled loads independently isolated or use harmless test loads, pair again if needed, and save an actual detected output for an intended role. Unchanged **Not assigned** selections cannot release maintenance. Only then perform ON/OFF tests, identify the mapping and finish the other distinct assignments. Automation can resume immediately after that first save.

Follow [Restoring assignments after maintenance](zigbee.md#restoring-assignments-after-maintenance). Do not use repeated resets or a Main Controller factory reset to bypass the pause.

## A Zigbee device disappeared after an H2 firmware update

A full H2 update replaces the Zigbee network state and clears assignments during preparation. Use **Start pairing** to pair the device again, then safely save an initial intended detected assignment before ON tests. Identify/check the outputs and complete the remaining distinct assignments. See [Firmware Updates](firmware-update.md#pair-zigbee-devices-again).

<a id="forget-paired-devices-was-used-accidentally"></a>
## Reset network was used accidentally

**Zigbee → Advanced → Reset network** removes the paired device and clears assignments after OFF preparation. Pair the device again and recreate the required assignments. It does not restore itself after a restart, and it is separate from an S3 factory reset.

## Main Controller firmware update failed

Check the displayed error, correct S3 OTA release file and checksum. If the Main Controller still starts normally, reconnect and retry using **System → Main Controller firmware**. A rejected or incomplete upload does not by itself establish that full recovery is required.

If the result is unknown, check the running **Version / Build** and reload before another upload. Do not repeatedly remove power while the installation state is uncertain. See [Firmware Updates](firmware-update.md#updating-the-main-controller).

## Zigbee Controller firmware update failed

Check the error under **Zigbee → Advanced** and verify the H2 file is the correct encrypted release image, exactly 2 MiB.

If preparation could not confirm outputs OFF, the updater blocks programming. Restore communication and resolve that condition. If preparation succeeded but a later stage failed, assignments may already be cleared and maintenance remains active.

An interrupted H2 update may leave the Zigbee Controller unavailable. Reload the page to read the state; a retry may be possible from retained maintenance. If the panel blocks recovery or H2 remains unavailable, contact the maintainer rather than bypassing the checks. See [Firmware Updates](firmware-update.md#updating-the-zigbee-controller).

## Firmware file is rejected

Use the release's encrypted **S3 OTA** file for the Main Controller or its **H2** file for the Zigbee Controller. Check the checksum and hardware/version compatibility. Do not upload a full S3 recovery image, plain development binary or a renamed file through the S3 web updater.

## The controller restarted during normal use

Wait for network access to return, then check fresh measurements, Zigbee status, assignments and actual equipment. Unsaved cycle changes are lost at restart. If unexpected restarts repeat, note when they occur and review **Activity log** and **System → Diagnostics**, together with power-supply stability.

## The displayed time is incorrect

Open **System → Time and timezone**. Check the selected timezone and **Controller local time**. The timezone applies to display and automation in both time modes.

**Automatic (NTP)** needs network access to the configured time servers. In **Manual** mode, **Date and time (UTC)** expects UTC; **Use computer time** performs that conversion for you. Do not enter local clock time into the UTC field. Save the intended settings and verify the resulting controller local time before relying on schedules.

## A schedule activates at the wrong time

Check the controller local time, timezone, active cycle day and time point, light window and growing mode. A correct schedule can still run at the wrong local time if the clock or timezone is wrong.

## Configuration changes appear to have no effect

Wait for a confirmed save, then reload and read the stored value. If the result is uncertain, read it back before another change.

Cycle edits take effect in memory but require **Save cycle** to survive restart. Mode changes are saved immediately. Network/account changes and automatic time settings can restart the controller, so save pending cycle edits before making them. Zigbee assignments have their own **Save** buttons and must be verified separately.

## Factory reset

A **Main Controller factory reset** clears saved S3 configuration, including network, account, time, cycle and Zigbee assignments. It does not perform the H2 Zigbee network reset. Use it only when normal configuration recovery is not possible, and make connected equipment safe independently first.

1. Restart the Main Controller normally, without holding BOOT during power-on/reset.
2. During its approximately seven-second factory-reset countdown, press the **Main Controller's BOOT** button. The local display identifies this window with **BOOT = Factory reset**.
3. Release the button when the factory-reset notice appears and allow the reset/restart to complete.
4. Repeat [initial setup](getting-started.md).

Holding BOOT before the normal firmware starts can select programming mode instead of this application reset procedure. Do not confuse the Main Controller's button with the Zigbee Controller's BOOT button.

## After a Main Controller factory reset

Reconnect using the initial-setup instructions; the default name may differ from the name you previously chose. Restore network, account, time and cycle settings, then read **Zigbee**.

The H2 device may still be paired, but the S3 assignments were cleared. Check what is present before deciding to pair again. Identify/test the outputs and save the required roles. Observe the equipment before returning to automatic operation.

## Main Controller factory reset vs. Zigbee reset

| Operation | S3 configuration | Zigbee device and assignments |
| --- | --- | --- |
| Main Controller factory reset | Saved S3 configuration cleared | H2 network is not reset; S3 assignments must be recreated |
| Zigbee **Reset network** | Network/account/cycle settings retained | Paired device and assignments cleared; pairing and assignments must be restored |
| H2 firmware update | Other saved S3 settings retained | Full H2 network state replaced; pair again and save assignments |

## Before leaving the system unattended

Check fresh measurements, correct local time, the required saved assignments and physical ON/OFF operation. Observe heating, humidity and ventilation after any reset, update or configuration change. See [Safety](safety.md).

## Still having problems?

Include the Main Controller **Version / Build**, Zigbee **Firmware / Build**, device model, exact error or **Technical details**, steps to reproduce and relevant activity entries. Explain what changed immediately before the problem began.

Remove passwords, Wi-Fi credentials, private network details and service/provisioning material before sharing a report. See the [Security Policy](../SECURITY.md).

## Related documentation

[Getting Started](getting-started.md) · [Zigbee Setup](zigbee.md) · [Firmware Updates](firmware-update.md) · [Hardware Overview](hardware-overview.md) · [Compatibility](compatibility.md) · [Safety](safety.md)
