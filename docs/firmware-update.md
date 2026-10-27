# Firmware Updates

MycoBox has two controllers with separate firmware: the **Main Controller (ESP32-S3)** and **Zigbee Controller (ESP32-H2)**. Both can be updated through the local web interface.

## Before updating

1. Read the [release notes](https://github.com/Moffefe/MycoBox/releases). Check hardware compatibility, which controller needs updating and any required update order.
2. Record important settings and output assignments. Under **Cycle & automation**, use **Save cycle** to retain pending edits before a restart.
3. Choose a time when you can supervise the connected equipment and tolerate an interruption of automation.
4. Keep MycoBox powered, use a stable local connection and leave the update page open until installation is confirmed.

A release may require only an S3 update. When a release requires both controllers, install the compatible pair and follow its instructions. An older H2 that cannot report the required outputs may prevent a newer S3 from controlling or assigning them. Do not assume that any two versions work together.

## Firmware files

Use only the encrypted firmware published for compatible MycoBox hardware in [GitHub Releases](https://github.com/Moffefe/MycoBox/releases).

| Release asset | Intended use |
| --- | --- |
| `MycoBox-S3-OTA-vX.XXX.EN.bin` | Main Controller web update: a dedicated encrypted S3 OTA package |
| `MycoBox-H2-vX.XXX.EN.bin` | Zigbee Controller update: a complete encrypted H2 image, exactly 2 MiB (2,097,152 bytes) |
| `SHA256SUMS.txt` | Checksums for the release files |

Do not interchange S3 and H2 files. An ordinary application binary, development image or full S3 recovery image is not an S3 OTA package. Renaming a file does not convert its format. The updater validates the selected firmware.

### Firmware file integrity

Compare the downloaded file's SHA-256 with its entry in the release's **SHA256SUMS.txt**. For example, in PowerShell, replace the filename with the one you downloaded:

```powershell
Get-FileHash -Algorithm SHA256 '.\MycoBox-S3-OTA-vX.XXX.EN.bin'
```

If the checksum differs, download the file again before continuing.

## What happens to settings?

| Operation | Settings and pairing |
| --- | --- |
| Normal S3 web OTA | Saved S3 settings are retained; it does not reset Zigbee pairing or assignments. Unsaved cycle edits are lost at restart. Follow any release-specific migration instructions. |
| H2 web update | Preparation clears the assignments, and the full H2 image replaces the Zigbee network state. Pair again, safely save an initial intended assignment, then test outputs and complete the assignments. |
| Full S3 recovery image over USB | Replaces the full S3 flash contents, including stored settings. Initial setup is required again. This is a service operation, not normal web OTA. |

Before downgrading, check compatibility and configuration instructions for the older firmware. It may not understand settings saved by a newer version.

## Updating the Main Controller

Open **System → Main Controller firmware**. The **Updates** shortcut on the System page takes you to this section.

![System page showing Main Controller firmware information and the OTA file picker](../media/web-ui/firmware-settings.png)

1. Check the installed **Version** and **Build**.
2. In **Main Controller OTA package (.bin)**, select the correct S3 OTA release file using the file picker.
3. Select **Update Main Controller** and confirm the warning.
4. Wait while the file transfers and MycoBox verifies and installs it. **100% transfer is not installation completion.**
5. After the page reports success, allow the automatic restart and reload to finish.
6. Reconnect if necessary, then check **Version**, **Build**, saved settings, current measurements and equipment operation.

Do not close the page or remove power during verification. The Main Controller selects the new application only after package validation succeeds.

### If the Main Controller update fails

Read the displayed error. If the controller still starts normally, verify the file and checksum, then retry from **Main Controller firmware** using a reliable connection.

**Update result unknown** means the browser lost confirmation; it does not establish success or failure. Reconnect, check the reported version and reload the configuration before trying again. Avoid repeated power cycles or another upload while the result is unresolved.

If normal access cannot be restored, see [Recovery firmware](#recovery-firmware) and [Troubleshooting](troubleshooting.md#main-controller-firmware-update-failed).

## Updating the Zigbee Controller

Open **Zigbee → Advanced → Zigbee Controller · ESP32-H2**. The **Zigbee Controller updates** link on the System page also opens Zigbee.

![Zigbee page with assignments and the Advanced section for controller firmware and network reset](../media/web-ui/zigbee-settings.png)

An H2 update replaces the full Zigbee Controller image. Keep power connected throughout the operation. Afterwards, the one paired device and its assignments must be restored.

### H2 update procedure

1. Record which physical output serves **Humidifier**, **Fan**, **Light** and **Heat**.
2. Read **Firmware** and **Build** under **Advanced**.
3. In **Zigbee Controller firmware (.bin, 2 MiB)**, select the correct H2 release file.
4. Select **Update Zigbee Controller** and confirm the warning.
5. Wait for preparation, transfer and final installation. Reaching 100% only finishes the browser transfer; keep the page open until installation is confirmed.
6. Wait for the Zigbee Controller restart and page reload, then check its firmware information.
7. Follow [Pair Zigbee devices again](#pair-zigbee-devices-again) before relying on automation.

During preparation, MycoBox must confirm the necessary outputs OFF and save cleared assignments. If it cannot do so, it blocks the update. Restore communication and resolve the reported problem before retrying.

Once preparation has succeeded, assignments are cleared and new ON commands remain blocked by maintenance until a new assignment is successfully saved. This state survives a Main Controller restart, including when an upload or installation later fails. A restart does not restore the old assignments.

### Pair Zigbee devices again

After a successful H2 update:

1. Keep the controlled loads independently isolated or use harmless test loads while restoring the mapping.
2. On **Zigbee**, select **Start pairing** and pair the switch or power strip again.
3. Choose an actual detected output for an intended role and **Save** that initial assignment. Use the recorded mapping where available. **Turn ON** is disabled during maintenance until this save succeeds; saving unchanged **Not assigned** selections does not release it.
4. After that save, test the detected outputs with **Turn ON / Turn OFF**, identify their physical sockets and finish or correct the distinct assignments for the required roles.
5. Check every saved mapping, the growing mode, cycle and physical operation before leaving the installation unattended.

Automation can resume for a role immediately after a successful assignment save, including while you are identifying other outputs. Follow [Restoring assignments after maintenance](zigbee.md#restoring-assignments-after-maintenance) with loads kept safe. MycoBox supports one paired device, not several separate plugs.

### If an H2 update is interrupted

Reconnect to the Main Controller, reload **Zigbee**, and read its firmware, device and maintenance status before another action. An unknown result may have left preparation complete even if the final response was lost.

If MycoBox permits a retry from the retained maintenance state, use the same correct H2 release image and keep power stable. An interrupted full-image update can leave H2 unavailable; successful preparation may still allow another upload through S3. If the updater blocks preparation or H2 remains unavailable after retrying, use the recovery guidance below.

Do not use a factory reset to bypass maintenance or assume that the old assignments survived. See [Troubleshooting](troubleshooting.md#zigbee-controller-firmware-update-failed).

## Updating both controllers

Follow the release notes for the required files, compatible versions, order and pairing changes. Do not perform an H2 update solely because a file is present when the release instructions say it is unnecessary.

## Version verification

After an update, compare the displayed version and build with the release notes:

| Controller | Location |
| --- | --- |
| Main Controller | **System → Main Controller firmware → Version / Build** |
| Zigbee Controller | **Zigbee → Advanced → Firmware / Build** |

A successful transfer alone is not confirmation that the new firmware is running or that connected equipment is ready.

## Recovery firmware

Full recovery is a service procedure for a controller that cannot be restored through the normal interface. The full S3 recovery image is intended for USB recovery and overwrites S3 settings. It must not be uploaded through **Main Controller OTA package (.bin)**.

Normal public downloads are the encrypted S3 OTA and H2 release files. Recovery images and device-specific service tooling are separate. If recovery is needed, contact the project maintainer with the controller model, last known versions and exact error. Use the correct service procedure for that device instead of a generic ESP32 flashing or erase recipe.

After a full S3 recovery, repeat initial setup and verify assignments. After H2 recovery or a full H2 update, pair the device again and recreate assignments. Keep equipment supervised until configuration and physical ON/OFF operation have been checked.

## Related documentation

[Getting Started](getting-started.md) · [Zigbee Setup](zigbee.md) · [Troubleshooting](troubleshooting.md) · [Compatibility](compatibility.md) · [Safety](safety.md)
