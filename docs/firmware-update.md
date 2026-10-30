# Firmware Updates

MycoBox has separate firmware for the **Main Controller (ESP32-S3)** and **Zigbee Controller (ESP32-H2)**. This guide covers their web updates and recovery.

## Before updating

- Read the [release notes](https://github.com/Moffefe/MycoBox/releases) for compatible hardware, required controller versions and any migrations. Update only the controllers the release requires.
- Save pending cycle edits and [export a settings backup](backup-restore.md#export-settings).
- Supervise connected equipment during the interruption. Keep MycoBox powered, use a stable local connection and leave the update page open until completion.

<a id="updating-both-controllers"></a>
H2 application OTA requires an S3 version that supports its format. For [v1.666.EN](https://github.com/Moffefe/MycoBox/releases/tag/v1.666.EN), install **S3 first, then H2**. An older H2 that cannot report the required outputs may prevent a newer S3 from controlling or assigning them.

## Firmware files

Download encrypted packages for your hardware from [GitHub Releases](https://github.com/Moffefe/MycoBox/releases).

| File | Use |
| --- | --- |
| `MycoBox-S3-OTA-vX.XXX.EN.bin` | Main Controller web OTA |
| `MycoBox-H2-OTA-vX.XXX.EN.bin` | Current Zigbee Controller application OTA; introduced in v1.666.EN |
| `MycoBox-H2-vX.XXX.EN.bin` in older releases | Legacy full H2 image, exactly 2 MiB; use only with its matching older procedure |
| `SHA256SUMS.txt` | Release file checksums |

**Current web forms reject full recovery images.** S3 and H2 packages are not interchangeable; plain development binaries and renamed files do not become OTA packages.

### Firmware file integrity

Compare the downloaded file's SHA-256 with **SHA256SUMS.txt**. In PowerShell, substitute your filename:

```powershell
Get-FileHash -Algorithm SHA256 '.\MycoBox-S3-OTA-v1.666.EN.bin'
```

If it differs, download the file again before continuing.

## What happens to settings?

| Operation | Effect on saved data |
| --- | --- |
| Normal S3 web OTA | Retains saved S3 settings, Zigbee pairing and assignments. Unsaved cycle edits are lost at restart. |
| Current H2 application OTA | Retains the compatible Zigbee network, paired device and S3 assignments. |
| Older full-image H2 update or full H2 recovery | Replaces Zigbee data; pairing must be recreated and assignments verified/restored. |
| Full S3 recovery over USB | Replaces saved S3 configuration; initial setup is required again. |

H2 preservation applies to the existing compatible 2 MB setup and Zigbee data format. Follow separate release instructions for layout or data-format migrations. Before downgrading, check whether the older firmware can read settings saved by your current version.

<a id="pair-zigbee-devices-again"></a>
When recovery or a legacy update requires pairing again, use [Zigbee assignment restoration](zigbee.md#restoring-assignments-after-maintenance). A [settings backup](backup-restore.md) can restore selected S3 configuration, but cannot recreate H2 pairing, firmware or security state.

## Version verification

Read the installed versions before updating and compare them with the release notes afterwards:

| Controller | Version information |
| --- | --- |
| Main Controller | **System → Main Controller firmware → Version / Build** |
| Zigbee Controller | **Zigbee → Advanced → Firmware / Build** |

## Updating the Main Controller

Open **System → Main Controller firmware**, directly or using the **Updates** shortcut.

![Main Controller firmware section](../media/web-ui/firmware-settings.png)

1. Select the matching S3 release file in **Main Controller OTA package (.bin)**.
2. Select **Update Main Controller** and confirm.
3. Wait for package validation and installation. **100% transfer is not installation completion.** Keep power connected; the new application is selected only after validation succeeds.
4. Allow the automatic restart and reload, reconnecting if necessary.
5. Verify the installed version, saved configuration and fresh measurements. Use the [equipment checks](safety.md#before-leaving-the-system-unattended) before unattended operation.

### If the Main Controller update fails

If S3 still starts normally, read the error, check the file and checksum, and retry over a reliable connection. **Update result unknown** means confirmation was lost: reconnect, read the running version and configuration before another upload. Avoid repeated power cycles while the result is unresolved.

If normal access cannot be restored, use the [recovery guidance](#recovery-firmware).

## Updating the Zigbee Controller

Open **Zigbee → Advanced → Zigbee Controller · ESP32-H2**, or follow **Zigbee Controller updates** from System.

![Zigbee page with the Advanced firmware section](../media/web-ui/zigbee-settings.png)

### H2 update procedure

1. Check that the required S3 update is installed, and keep the paired outlet or power strip powered.
2. Select the matching **H2-OTA** release file in **Zigbee Controller OTA package (.bin)**. Older screenshots or firmware may show the former full-image field.
3. Select **Update Zigbee Controller** and confirm. MycoBox closes pairing, confirms the necessary outputs OFF and saves preparation before programming. If preparation fails, programming is blocked and assignments are retained.
4. Wait through transfer, H2 restart and verification. After writing, the panel checks the expected firmware, saved device/outputs and confirmed OFF. **Automation stays paused until verification finishes.**
5. Verify the installed version and retained assignments, then check [equipment operation](safety.md#before-leaving-the-system-unattended).

While this update is incomplete, new ON commands, assignment changes, pairing and network reset remain blocked, including after an S3 restart. An earlier network-reset pause remains separate and still requires [assignment restoration](zigbee.md#restoring-assignments-after-maintenance).

### If an H2 update is interrupted

Reconnect, reload **Zigbee** and read update status. If verification is waiting for the saved switch, restore its power/communication and allow it to continue; absence does not mean settings were erased.

An incomplete transfer requires uploading the **complete matching H2 OTA package** again. Valid prior OFF preparation can permit retry even if H2 no longer answers or S3 has restarted. A generic maintenance pause does not authorize an offline retry. If preparation cannot be validated, the updater may require a responding H2 and fresh OFF confirmation.

H2 cannot roll back an interrupted application write. If retry is blocked or H2 remains unavailable, seek [service recovery](#recovery-firmware). Do not reset the network, erase settings or bypass verification to resume automation.

## Recovery firmware

Full recovery is a service operation when normal updates cannot restore a controller. Its data effects are listed [above](#what-happens-to-settings); it uses separate images and device-specific tooling.

Contact the maintainer with the controller model, last known versions and exact error. Use the procedure for that device rather than a generic ESP32 erase recipe. Afterwards, follow [initial setup](getting-started.md), [settings restoration](backup-restore.md#import-selected-settings) or [Zigbee restoration](zigbee.md#restoring-assignments-after-maintenance) as applicable, then verify equipment under supervision.

<a id="related-documentation"></a>
[Documentation](README.md) · [Troubleshooting](troubleshooting.md) · [Safety](safety.md)
