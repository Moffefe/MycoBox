# Getting started

[MycoBox home](../README.md) · [Documentation](README.md)

Connect MycoBox, set up a simple growing cycle and check your equipment. Keep equipment unplugged from the smart sockets until you have identified which socket controls each function.

| Stage | What you will do |
| --- | --- |
| [1. Connect](#1-connect) | Open the panel, change the login and join your Wi-Fi |
| [2. Configure](#2-configure) | Set the clock, check readings and create a cycle |
| [3. Verify](#3-verify) | Test your equipment and save a backup |

[Controller name](#6-change-the-controller-name) · [Several controllers](#more-than-one-controller) · [Network recovery](#network-recovery) · [Factory reset](#factory-reset)

## 1. Connect

<a id="1-power-on-the-controller"></a>

### Power on the controller

Connect the power supply and wait for MycoBox to start.

On first use, it creates a Wi-Fi network named `<controller-name>_AP`, for example `FC123456_AP`. Look for the name shown by your controller.

<a id="2-connect-to-the-mycobox-access-point"></a>

### Connect to the access point

1. On your phone or computer, join `<controller-name>_AP` with the password `12345678`.
2. Move the controller's joystick left from the main screen to open **Network**.
3. Find the IP address and enter `http://<displayed-IP-address>` in your browser.

If your phone says the network has no internet, choose to stay connected. MycoBox works locally.

<a id="3-log-in"></a>

### Log in and replace the factory credentials

On first use, sign in with username **admin** and password **admin**. For an already configured controller, use its saved account.

Open **System → Account → Administrator account**. Enter your new login, clear **Keep the current password**, and enter a new password. Choose **Save & restart**, then sign in again.

Use your home or another trusted local network. See [protecting access](../SECURITY.md#local-network-access) for network settings.

<a id="4-configure-wi-fi"></a>

### Join your Wi-Fi network

Open **System → Network**.

1. Select your Wi-Fi network. Use **Refresh** to scan again, or enter the name manually if it is hidden or missing.
2. For a new network, clear **Keep the password for the saved network** and enter the Wi-Fi password. Leave it empty only if that network has no password.
3. Choose **Save & restart**.
4. Reconnect your phone or computer to the same Wi-Fi network as MycoBox.

If MycoBox cannot join your network, it brings back its own access point after several minutes. Follow [Network recovery](#network-recovery) to correct the settings.

<a id="5-open-mycobox-on-your-local-network"></a>

### Open MycoBox on your local network

Use the IP address on the controller's **Network** screen, or open:

`http://<controller-name>.local`

For example, a controller named `GrowRoom` is available at `http://GrowRoom.local`. If that address does not open, use the IP address instead.

**Ready:** you can open the panel and sign in with your new account.

## 2. Configure

<a id="7-configure-time-and-localization"></a>

### Set the clock and timezone

Open **System → Time → Time and timezone**.

1. Select your **Timezone**.
2. Choose **Automatic (NTP)** to set the clock from a network time server, or **Manual** for offline use.
3. In Manual mode, select **Use computer time**. If entering the time yourself, the **Date and time (UTC)** field needs UTC rather than local time.
4. Choose **Save time settings** and check **Controller local time**.

The built-in clock keeps time offline once set. Check it again after a clock or battery problem. Changing the time mode restarts MycoBox; reconnect when it finishes.

<a id="8-check-the-sensors"></a>

### Check temperature and humidity

Open **Measurements**. Check that temperature and humidity are updating and look right for your growing space. For missing readings or a sensor message, see [Measurements](web-interface.md#measurements) or [Troubleshooting](troubleshooting.md#sensor-values-are-missing).

<a id="9-configure-zigbee-devices"></a>

### Pair the switch and assign its outputs

Follow [Zigbee setup](zigbee.md) to connect your smart plug or strip, test each socket and assign it to **Humidifier**, **Fan**, **Light** or **Heat**.

Saving an assignment can start automation, so keep equipment unplugged while identifying sockets.

<a id="10-configure-environmental-control"></a>

### Create and save a simple cycle

Open **Cycle & automation**. Choose the growing and humidification modes, then set a simple daily schedule. The [cycle guide](web-interface.md#cycle-and-automation) explains each setting.

After applying your edits, choose **Save cycle** to keep them after a restart.

**Ready:** the clock is correct, readings are updating, sockets are assigned and the cycle is saved.

## 3. Verify

<a id="11-test-every-controlled-device"></a>

### Test every controlled device

Connect each appliance to its assigned socket. Test both ON and OFF, watching the appliance itself: the fan should move air, the humidifier should produce mist and the heater should respond.

Check the equipment's power ratings and keep electrical connections dry. The [Safety guide](safety.md) has a short setup checklist.

<a id="12-observe-the-environment"></a>

### Observe scheduled transitions

Watch **Overview**, **Measurements** and **Activity log** as the schedule changes. Check the active day and confirm that temperature, humidity and equipment respond as expected.

<a id="13-save-a-settings-backup"></a>

### Save a settings backup

Choose **System → Backup & restore → Export settings** and keep the downloaded file. You can use it later to [restore selected settings](backup-restore.md).

**Setup complete:** your equipment follows the schedule and you have a backup.

<a id="6-change-the-controller-name"></a>

## Optional: name your controller

Select the pencil beside the controller name. Use 3–20 letters and digits, starting with a letter. Choose a different name for each MycoBox on your network.

Save pending cycle edits first: saving a new name restarts the controller. The new name also becomes its `.local` address and access point name.

## More than one controller

Use [Cluster](web-interface.md#cluster) to find other MycoBox units and copy settings or cycles between them.

## Network recovery

Wait several minutes for MycoBox to try the saved Wi-Fi network, then look for `<controller-name>_AP`.

[Connect to the access point](#2-connect-to-the-mycobox-access-point) and [correct the Wi-Fi settings](#4-configure-wi-fi). If the access point does not appear, use the [network checks](troubleshooting.md#network-access-problems).

## Factory reset

A Main Controller factory reset removes its saved Wi-Fi, account, clock settings, cycle and output assignments. Use it when you cannot recover access through normal settings. Disconnect controlled equipment first.

1. Restart the **Main Controller** without holding BOOT.
2. During the roughly seven-second **BOOT = Factory reset** countdown, press that controller's **BOOT** button.
3. Release it when the reset notice appears and wait for the restart.
4. Set up MycoBox again using the factory login above.

Press BOOT during the countdown: holding it before startup opens programming mode. Use the Main Controller's button, not the Zigbee Controller's.

The Zigbee device can remain paired after this reset. Check **Zigbee**, then restore its assignments manually or from a [settings backup](backup-restore.md). A backup restores assignments to an already paired device.

To remove the paired device as well, use the separate [Zigbee network reset](zigbee.md#forgetting-all-zigbee-devices).

<a id="before-unattended-operation"></a>

After a reset, repeat the [equipment checks](#11-test-every-controlled-device) before leaving MycoBox running.

## Next steps

[Web interface](web-interface.md) · [Zigbee setup](zigbee.md) · [Backup and restore](backup-restore.md) · [Firmware updates](firmware-update.md) · [Troubleshooting](troubleshooting.md)
