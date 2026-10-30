# Firmware Updates

MycoBox has two controllers with separate firmware: the **Main Controller (ESP32-S3)** and **Zigbee Controller (ESP32-H2)**. Both can be updated through the local web interface.

## Before updating

1. Read the [release notes](https://github.com/Moffefe/MycoBox/releases). Check hardware compatibility, which controller needs updating and the required order.
2. Use **Save cycle** to retain pending edits. Use **System → Backup & restore → Export settings** for a configuration copy; see [Backup & restore](backup-restore.md) for its scope.
3. Choose a time when you can supervise equipment and tolerate an interruption of automation.
4. Keep MycoBox and the paired outlet or power strip powered, use a stable local connection and leave the update page open until installation and verification finish.

A release may require only an S3 update. When it requires both controllers, install the compatible pair in the stated order. An older H2 that cannot report the required outputs may prevent a newer S3 from controlling or assigning them.

## Firmware files

Use only the encrypted firmware published for compatible hardware in [GitHub Releases](https://github.com/Moffefe/MycoBox/releases).

| Release asset | Intended use |
| --- | --- |
| `MycoBox-S3-OTA-vX.XXX.EN.bin` | Main Controller web update: an encrypted S3 OTA package |
| `MycoBox-H2-OTA-vX.XXX.EN.bin` | Zigbee Controller web update: an encrypted H2 application OTA package preserving compatible Zigbee data |
| `SHA256SUMS.txt` | Checksums for the release files |

[v1.666.EN](https://github.com/Moffefe/MycoBox/releases/tag/v1.666.EN) introduces the H2 application OTA package. Install its S3 update first, then select `MycoBox-H2-OTA-v1.666.EN.bin` in the updated Zigbee page.

Older releases use names such as `MycoBox-H2-v1.659.EN.bin` for a complete 2 MiB H2 image. That format replaces Zigbee data and requires pairing again. **The current H2 web updater rejects full recovery images.** Follow an older release's instructions only with its matching updater.

Do not interchange S3 and H2 files. Plain development binaries and full recovery images are not OTA packages. Renaming a file does not convert its format.

### Firmware file integrity

Compare the file's SHA-256 with its entry in **SHA256SUMS.txt**. For example, in PowerShell, replace the filename with your downloaded file:

```powershell
Get-FileHash -Algorithm SHA256 '.\MycoBox-S3-OTA-v1.666.EN.bin'
```

If the checksum differs, download the file again before continuing.

## What happens to settings?

| Operation | Settings and pairing |
| --- | --- |
| Normal S3 web OTA | Saved S3 settings, Zigbee pairing and assignments are retained. Unsaved cycle edits are lost at restart. Follow release-specific migration instructions. |
| Current H2 application OTA | Preserves the compatible Zigbee network, paired device and S3 assignments. Outputs are turned OFF; automation waits for post-update verification. |
| Older full-image H2 update or full H2 recovery | Replaces Zigbee data. Pair again and verify/recreate assignments as directed by the matching procedure. |
| Full S3 recovery over USB | Replaces saved S3 settings. Initial setup is required again; a compatible backup can help restore selected configuration afterwards. |

H2 preservation applies to the existing compatible 2 MB setup and Zigbee data format. A layout or data-format migration requires separate release instructions.

Before downgrading, check compatibility and configuration instructions. Older firmware may not understand settings saved by a newer version. A settings export does not restore H2 pairing, firmware or security state.

## Updating the Main Controller

Open **System → Main Controller firmware**. The **Updates** shortcut takes you there.

![System page showing Main Controller firmware information and the OTA file picker](../media/web-ui/firmware-settings.png)

1. Check the installed **Version** and **Build**.
2. In **Main Controller OTA package (.bin)**, select the correct S3 OTA file.
3. Select **Update Main Controller** and confirm the warning.
4. Wait while MycoBox transfers, verifies and installs it. **100% transfer is not installation completion.**
5. After success is reported, allow the automatic restart and reload to finish.
6. Reconnect if necessary, then check **Version**, **Build**, saved settings, fresh measurements and equipment operation.

Keep the page open and power connected during verification. The Main Controller selects the new application only after package validation succeeds.

### If the Main Controller update fails

Read the error. If the controller starts normally, verify the file and checksum, then retry using a reliable connection.

**Update result unknown** means the browser lost confirmation. Reconnect, check the reported version and reload configuration before trying again. Avoid repeated power cycles or another upload while the result is unresolved.

If normal access cannot be restored, see [Recovery firmware](#recovery-firmware) and [Troubleshooting](troubleshooting.md#main-controller-firmware-update-failed).

## Updating the Zigbee Controller

Open **Zigbee → Advanced → Zigbee Controller · ESP32-H2**. The **Zigbee Controller updates** link on System also opens Zigbee.

![Zigbee page with assignments and the Advanced section for firmware and network reset](../media/web-ui/zigbee-settings.png)

Use **Zigbee Controller OTA package (.bin)** in the current interface. Older screenshots or firmware may show the former full-image field.

### H2 update procedure

1. Install the S3 version required by the release first. For v1.666.EN, update S3 before H2.
2. Check **Firmware** and **Build** under **Advanced**, and review saved assignments.
3. Select the matching **H2-OTA** package in **Zigbee Controller OTA package (.bin)**.
4. Select **Update Zigbee Controller** and confirm.
5. Keep the paired outlet or power strip powered. MycoBox closes pairing, confirms the necessary outputs OFF and saves update preparation. If this cannot finish, programming is blocked and assignments are retained.
6. Wait for transfer, H2 restart and verification. A completed upload means firmware was written; the panel then waits for the expected firmware, saved device/outputs and confirmed OFF. **Automation remains paused until verification completes.**
7. Check firmware information, retained assignments and physical equipment operation before unattended use. Normal application OTA does not require pairing again.

While an H2 update is incomplete, new ON commands, assignment changes, pairing and network reset remain blocked. The state survives an S3 restart. An earlier network-reset pause is separate and still requires restoring assignments after that reset.

### Pair Zigbee devices again

Pairing again is needed after an intentional network reset, full H2 recovery or an older full-image update; it is not a normal current H2 application OTA step.

Follow [Restoring assignments after maintenance](zigbee.md#restoring-assignments-after-maintenance) when a reset or older update cleared assignments. Keep loads safe, pair if needed, save an initial intended assignment, then identify/test outputs and complete the remaining distinct assignments. Automation may resume for saved roles after the first successful save.

### If an H2 update is interrupted

Reconnect, reload **Zigbee** and read update status. Pairing and assignments are retained. Keep the paired device powered: if verification is waiting for it, restore its power/communication and allow verification to continue.

An incomplete transfer requires uploading the **complete matching H2 OTA package** again. Successful prior OFF preparation can permit retry even when H2 no longer answers, including after an S3 restart. A generic maintenance pause alone does not permit an offline retry. If preparation cannot be validated, the panel may require a responding H2 and fresh OFF confirmation or service recovery.

H2 cannot roll back an interrupted application write by itself. If retrying is blocked or H2 remains unavailable, contact the maintainer. Do not reset the network, erase settings or bypass verification to resume automation. See [Troubleshooting](troubleshooting.md#zigbee-controller-firmware-update-failed).

## Updating both controllers

Follow the release notes for required files, compatible versions and order. The H2 application OTA format requires a Main Controller that supports it, so update S3 first. Do not update H2 solely because a file is present when the release says it is unnecessary.

## Version verification

Compare the displayed version and build with the release notes:

| Controller | Location |
| --- | --- |
| Main Controller | **System → Main Controller firmware → Version / Build** |
| Zigbee Controller | **Zigbee → Advanced → Firmware / Build** |

A successful transfer alone does not confirm that new firmware is running or equipment is ready. For H2, also wait until update verification is complete.

## Recovery firmware

Full recovery is a service procedure for a controller that cannot be restored through normal updates. A full S3 recovery image overwrites S3 settings. A full H2 recovery image replaces Zigbee data. Neither full image belongs in the current web OTA forms.

Normal current downloads are encrypted **S3-OTA** and **H2-OTA** packages. Recovery images and device-specific service tooling are separate. Contact the maintainer with the controller model, last known versions and exact error, and use the correct procedure for that device.

After full S3 recovery, repeat initial setup and verify assignments. A compatible [settings backup](backup-restore.md) can restore selected S3 configuration but cannot recreate H2 pairing. After full H2 recovery, pair again and verify/recreate assignments. Supervise equipment until configuration and physical ON/OFF operation have been checked.

## Related documentation

[Getting Started](getting-started.md) · [Backup & restore](backup-restore.md) · [Zigbee Setup](zigbee.md) · [Troubleshooting](troubleshooting.md) · [Compatibility](compatibility.md) · [Safety](safety.md)
