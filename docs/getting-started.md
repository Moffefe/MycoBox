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

Open **Measurements** and confirm that the SHT41 provides reasonable **Temperature** and **Humidity** readings. Overview also shows these values and how recently they were measured.

![Temperature, humidity and activity in Measurements](../media/web-ui/measurements.png)

The current sensor configuration measures temperature and relative humidity. It has no CO₂ reading or altitude setting.

The interface distinguishes **Sensor heater active**, **Sensor cooling after heating**, possible sensor wetting and a communication error. Ambient readings pause during sensor heating and cooling. An old reading is not presented as a fresh measurement. Possible wetting is an observation, not proof of condensation. Correct persistent sensor errors before enabling measurement-dependent control.

Measurements contains up to 288 five-minute history samples, approximately 24 hours of continuous operation. History is held in memory and begins again after a restart. See [Compatibility](compatibility.md#environmental-sensors) for the supported sensor and its limitations.

## 9. Configure Zigbee devices

Open **Zigbee** from the main navigation.

MycoBox pairs with **one compatible switching device**: a smart outlet or a power strip with independently controlled outputs. To use all four control functions, the device needs at least four compatible independent outputs.

1. Choose **Start pairing**, then put the switching device into its manufacturer's pairing mode.
2. Wait for it to be recognized. The pairing window normally lasts 120 seconds; **Cancel pairing** closes it early.
3. Use **Test output** to identify the detected outputs. Test both ON and OFF with a suitable load and verify the physical outlet.
4. Under **Assignments**, select and save an output for each required role: **Humidifier**, **Fan**, **Light** or **Heat**.

Each role needs a different output from the paired device. Do not infer output numbers from the physical outlet labels, and leave unused roles unassigned. Changing an assignment requires the old and new outputs to confirm OFF.

After a network reset, maintenance can keep **Turn ON** disabled until a new assignment is saved. Restoring an assignment can resume automation immediately, so keep equipment isolated while recovering an unknown mapping. Follow [maintenance recovery](zigbee.md#restoring-assignments-after-maintenance) rather than repeating the initial test steps above.

A compatible H2 application OTA update preserves pairing and assignments. Update the Main Controller to firmware supporting that package first, then follow the [firmware guide](firmware-update.md). Wait for post-update verification before relying on automation.

## 10. Configure environmental control

Open **Cycle & automation**.

![Cycle and automation settings](../media/web-ui/cultivation-cycle.png)

Choose the modes that fit your setup:

| Setting | Behavior |
| --- | --- |
| **Fruiting** | Fan follows its timing, Heat uses the active scheduled temperature, and Light follows its daily window when enabled. |
| **Incubation** | Fan and Light are set to OFF. Heat uses fixed incubation thresholds. The selected humidification mode is retained. |
| **Timer** humidification | Uses configured ON and OFF periods; it does not regulate RH to the humidity target. |
| **Adaptive** humidification | Uses fresh humidity readings and the active target to adjust humidifier pulses. Its response must be observed in your enclosure. |

Start with a simple daily schedule. One day with a single time point at **00:00** is enough for unchanged settings. A cycle can contain up to **32 days**, with up to **four time points per day**. Each day also has a light window; its ON hour must be earlier than its OFF hour.

Edits applied in the cycle editor become active in memory. Choose **Save cycle** to retain them after a restart. Mode changes are saved separately when changed. **Restart cycle** changes the cycle's start time and also needs a subsequent **Save cycle**.

Adaptive V1.4 waits at least five minutes between starts and limits a single run to 120 seconds. Its first run after a restart also waits for five minutes of controller uptime. It learns from the enclosure's response; it does not need a chamber-volume or humidifier-output setting. Timer mode keeps its own configured ON/OFF timing.

## 11. Test every controlled device

Before relying on automation, check each saved assignment against the connected equipment:

| Role | Expected equipment |
| --- | --- |
| Humidifier | Humidifier |
| Fan | Ventilation fan |
| Light | Light |
| Heat | Heating mat or other suitable heating equipment |

Watch the actual equipment as well as the panel. A confirmed output state does not prove that air is moving, mist is being produced or heat is being delivered. Automation can change an assigned output according to its schedule, so do initial output identification before assigning equipment.

Check electrical ratings, behavior after power is restored and safe operation around moisture. See [Safety](safety.md).

## 12. Observe the environment

Use **Overview** to check the Growbox diagram, measurement freshness, active cycle and assignments. Use **Measurements** to compare temperature and RH with activity tracks, and **Activity log** to investigate recorded control events.

Confirm that the physical equipment responds correctly and conditions move in the intended direction. Observe the enclosure through its scheduled transitions before unattended operation.

Local warnings describe persistent problems. They are informational and do not replace independent protection or regular checks.

## 13. Save a settings backup

Open **System → Backup & restore → Export settings** and keep the downloaded JSON after confirming your setup. It contains the growing profile and configuration, including active unsaved schedule edits, but no saved passwords, firmware or Zigbee network keys. It does not replace **Save cycle** on the controller.

**Import settings** lets you choose sections to restore or reuse on another controller. Zigbee assignments require the matching device to be paired already; a settings file cannot recreate pairing. See [Backup and restore](backup-restore.md) before importing. If the section is absent, install firmware supporting Backup & restore according to the release instructions.

## More than one controller

The **Cluster** page discovers other MycoBox controllers on the same local network. It can copy control modes, copy a complete cycle or restart the listed recipients. Each action shows the recipients and replacement scope before confirmation. Recipients need the same administrator login and password; Zigbee assignments remain local to each controller. See [Group actions](web-interface.md#cluster) before using this with connected equipment.

## Network recovery

If the saved Wi-Fi network cannot be reached, allow several minutes for connection attempts, then look for `<controller-name>_AP`.

Connect with password `12345678`, use the IP shown on the controller's **Network** display and correct the settings in **System → Network**. After **Save & restart**, reconnect your browser device to the chosen network.

If the AP does not appear or the interface remains unavailable, see [Troubleshooting](troubleshooting.md).

## Factory reset

A Main Controller factory reset clears its saved configuration and is intended for recovery when normal configuration is no longer possible. See [Troubleshooting](troubleshooting.md) for the procedure and its effects.

This is different from **Zigbee → Advanced → Reset network**, which removes the paired Zigbee device and clears output assignments. Do not reset a working installation merely to change its schedule or Wi-Fi settings.

## Before unattended operation

- Confirm reasonable, fresh temperature and RH readings.
- Check the local time and timezone.
- Identify and test every used output and assignment.
- Save the cycle and verify its active day and modes.
- Observe Fan, Humidifier, Light and Heat through their expected transitions.
- Provide suitable independent protection for heating and other critical equipment.

## Next steps

[Web interface](web-interface.md) · [Backup and restore](backup-restore.md) · [Hardware Overview](hardware-overview.md) · [Compatibility](compatibility.md) · [Zigbee Setup](zigbee.md) · [Firmware Updates](firmware-update.md) · [Troubleshooting](troubleshooting.md) · [Safety](safety.md)
