# Getting Started

[MycoBox home](../README.md) · [Documentation](README.md) · [Web interface](web-interface.md)

This guide takes a MycoBox controller from first power-on to a saved growing cycle. Keep controlled equipment disconnected until you have identified and tested its switching outputs.

## 1. Power on the controller

Connect the controller to its intended power supply and let it finish starting. The Main Controller loads settings, starts the Zigbee Controller, reads the sensor and brings up networking.

When no Wi-Fi network has been saved, MycoBox creates an access point named:

```text
<controller-name>_AP
```

A controller with factory settings receives a name beginning with `FC`, for example `FC123456_AP`. Use the actual name shown by your unit.

## 2. Connect to the MycoBox access point

1. On your phone or computer, connect to `<controller-name>_AP`.
2. Enter the access point password: `12345678`.
3. Find the controller's IP address on its local **Network** display. From the main display, move the joystick left to reach this screen.
4. Open `http://<displayed-IP-address>` in a browser.

A phone may report that this Wi-Fi network has no internet access. Stay connected to it while configuring MycoBox. The local interface does not require internet access.

## 3. Log in

Factory web credentials are:

| Field | Factory value |
| --- | --- |
| Username | `admin` |
| Password | `admin` |

If the controller has already been configured, use its saved account instead.

Open **System → Account → Administrator account** to change the credentials. Clear **Keep the current password** when entering a new password, then choose **Save & restart**. Reconnect and sign in again after the restart.

Use the interface on a trusted local network. It uses HTTP, which does not encrypt the browser connection. Do not expose it directly to the internet.

## 4. Configure Wi-Fi

Open **System → Network**.

1. Wait for the scan, or use **Refresh**.
2. Select your network. For a hidden or unlisted network, use the manual network-name option.
3. For a new network, clear **Keep the password for the saved network** and enter its password. Leave it empty only for an intentionally open network.
4. Choose **Save & restart** and wait for the controller to reconnect.
5. Reconnect your phone or computer to that same local network.

MycoBox attempts to join the saved network before falling back to its own access point. If the network is unavailable, this can take several minutes. See [Network recovery](#network-recovery).

## 5. Open MycoBox on your local network

Use the IP address on the controller's **Network** display or the address assigned by your router. In this mode, MycoBox also advertises:

```text
http://<controller-name>.local
```

For example, a controller named `GrowRoom` advertises `http://GrowRoom.local`.

Name resolution depends on your device and local network. If `.local` does not work, use the IP address. The access point connection can be used directly without mDNS.

## 6. Change the controller name

Select the pencil icon beside the controller name in the web interface. Names must:

- contain 3–20 letters and digits;
- start with a letter;
- be distinct from other controllers on your network.

Saving the name restarts the controller. Save any pending cycle changes first. The new name is used for the `.local` address on your network and for `<controller-name>_AP` in access point mode.

## 7. Configure time and localization

Open **System → Time → Time and timezone**.

- Select your **Timezone**. The local display and automation schedule use it in both time modes.
- Choose **Automatic (NTP)** if the controller can reach a network time server.
- Choose **Manual** for offline setup. **Date and time (UTC)** expects UTC, not local wall-clock time. **Use computer time** converts the computer's current time to UTC for you.
- Choose **Save time settings** and verify **Controller local time**.

A working DS3231 RTC with a valid saved time supplies the offline clock. After a clock or battery problem, correct the time before relying on schedules. A change of time mode restarts the Main Controller; reconnect if prompted.

## 8. Check the sensors

Open **Measurements** and confirm reasonable, fresh temperature and humidity readings before enabling measurement-dependent control. Read [Measurements and sensor states](web-interface.md#measurements) for the history, heating/cooling statuses and interpretation of missing data. Resolve persistent errors through [Troubleshooting](troubleshooting.md).

## 9. Configure Zigbee devices

Follow [Zigbee setup](zigbee.md) to pair the switching device, identify its physical outputs and save assignments for the functions you need. Keep controlled equipment isolated during output identification; saving an assignment can enable automation. Use the guide's separate maintenance recovery procedure if the network has already been reset.

## 10. Configure environmental control

Open **Cycle & automation**, choose the growing and humidification modes, and start with a simple daily schedule. Follow [Cycle and automation](web-interface.md#cycle-and-automation) for mode behavior, Adaptive control limits and the editor. Choose **Save cycle** after applying schedule edits so they survive a restart.

## 11. Test every controlled device

Check that every saved assignment operates the intended equipment in both ON and OFF states. Watch the actual device as well as the panel: output confirmation does not prove physical airflow, mist or heat. Check electrical ratings, behavior after power restoration and moisture precautions in [Safety](safety.md).

## 12. Observe the environment

Use [Overview](web-interface.md#overview-and-growbox), Measurements and Activity log to observe the enclosure through scheduled transitions. Confirm the active cycle day and modes, physical equipment response and environmental changes before unattended operation. Local warnings do not replace independent protection or regular checks.

## 13. Save a settings backup

After checking the setup, use **System → Backup & restore → Export settings** to keep a copy. Read [Backup and restore](backup-restore.md) for file contents, supported firmware and selective import. Exporting a copy does not replace **Save cycle** on the controller.

## More than one controller

See [Cluster](web-interface.md#cluster) for controller discovery, shared-account requirements and confirmed group operations.

## Network recovery

If the saved Wi-Fi network cannot be reached, allow several minutes for connection attempts, then look for `<controller-name>_AP`.

Reconnect using [AP access](#2-connect-to-the-mycobox-access-point), then correct the saved network through [Wi-Fi configuration](#4-configure-wi-fi).

If the AP does not appear or the interface remains unavailable, see [Troubleshooting](troubleshooting.md).

## Factory reset

A **Main Controller factory reset** clears saved S3 configuration, including network, account, time, cycle and output assignments. Use it only when normal configuration recovery is not possible. Make connected equipment safe independently first.

1. Restart the Main Controller normally, without holding BOOT during power-on or reset.
2. During the approximately seven-second countdown labelled **BOOT = Factory reset**, press the **Main Controller's BOOT** button.
3. Release it when the factory-reset notice appears and allow the reset and restart to finish.
4. Repeat initial setup using the factory access details above.

Holding BOOT before firmware starts can select programming mode instead. Do not confuse this button with the Zigbee Controller's BOOT button.

The reset does **not** reset the H2 Zigbee network. The device may remain paired, but S3 output assignments must be restored and verified. A compatible [settings backup](backup-restore.md) can restore selected configuration and matching assignments; it cannot recreate H2 pairing. Check Zigbee before deciding to pair again.

For the separate operation that removes the paired device, see [Zigbee network reset](zigbee.md#forgetting-all-zigbee-devices). Do not reset a working installation merely to change its schedule or Wi-Fi settings.

<a id="before-unattended-operation"></a>

Check the [equipment and observation steps](#11-test-every-controlled-device) before returning to unattended operation after a reset or configuration change.

## Next steps

[Web interface](web-interface.md) · [Backup and restore](backup-restore.md) · [Hardware Overview](hardware-overview.md) · [Compatibility](compatibility.md) · [Zigbee Setup](zigbee.md) · [Firmware Updates](firmware-update.md) · [Troubleshooting](troubleshooting.md) · [Safety](safety.md)
