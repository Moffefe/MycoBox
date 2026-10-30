# Backup and restore

Open **System → Backup & restore** to export settings, download diagnostics or restore selected settings from a JSON file. These operations work locally, including through the controller's access point without internet.

This guide applies to firmware that includes **Backup & restore**. If the section is absent, follow the [release notes and update instructions](firmware-update.md) to install a version that supports it. A feature described here may be newer than your installed firmware.

## Export settings

Choose **Export settings**, then check your browser's downloads for `mycobox-settings.json`.

The file contains:

| Section | Included settings |
| --- | --- |
| Growing profile | Daily schedule, time points and light windows |
| Control settings | Growing mode, humidification mode and light-schedule enable setting |
| Cycle progress | Cycle start time |
| System | Controller name, time mode and timezone |
| Wi-Fi network | Saved network name |
| Administrator account | Login name |
| Zigbee assignments | The four equipment assignments |

Export uses the current configuration, including active **unsaved schedule changes**. File information marks that state. Export does not save the running cycle on the controller; use **Save cycle** when you want those edits to survive its restart.

Saved passwords, Zigbee network keys, firmware and the learned Adaptive model are not included. Import does not restore controller security or recover an interrupted firmware update. The file cannot recreate the Zigbee network or pair a device. Keep it privately: network names, controller identity and device assignments can still identify your installation.

## Export diagnostics

Choose **Export diagnostics** and check for `mycobox-diagnostics.zip`. The browser creates the ZIP locally from one snapshot of controller data; it does not need an online archive service.

| File | Contents |
| --- | --- |
| `manifest.json` | Snapshot information, retained range, history limits and current warnings |
| `measurements.csv` | Retained historical measurements and recent control samples |
| `events.csv` | Retained events for Humidifier, Fan, Light, Heat and the sensor |
| `report.txt` | System report |

The archive contains the data currently retained in memory, rather than a permanent record of the entire growing cycle. Restart clears this history, and the oldest entries are replaced when buffers fill. A shorter history may therefore be expected. The export includes no saved passwords; review device and network information before sharing it.

A diagnostic ZIP is not a settings backup and cannot be selected for **Import settings**.

## Import selected settings

Keep connected equipment supervised while applying configuration. Changes can affect the running system as each step succeeds, before the final restart.

1. Choose **Import settings** and select a supported MycoBox settings JSON, up to **32 KiB**.
2. Review the source controller, firmware and export information. The dialog identifies a backup from another controller or one containing an unsaved profile.
3. Choose the sections to replace. **Growing profile** and **Control settings** are selected by default. **Cycle progress**, **System**, **Wi-Fi network**, **Administrator account** and **Zigbee assignments** are separate choices. Unselected sections keep their local values.
4. Supply any required passwords. A new Wi-Fi network needs its password or an explicit choice that it is open. For the same saved network, a blank password keeps this controller's current password. The administrator password can be kept or replaced.
5. If this controller has unsaved cycle changes, save them before continuing. **Save current cycle and continue** explicitly saves the current cycle and returns to validation; it does not confirm the import. You can cancel instead.
6. Choose **Review selected settings**. Preview and server validation do not write the imported settings.
7. After validation succeeds, select **Import these sections and restart the controller**, then **Import and restart**.
8. Wait for the result, reconnect after restart and read back the settings. Network, controller-name or account changes may require a new address or login.

All selected sections are written after confirmation, even if a selected value already matches. Importing **System** restores the time mode and timezone while keeping the current clock. Importing **Cycle progress** separately restores the cycle start time; leave it unselected when reusing a profile without copying its progress.

### Zigbee assignments

Importing assignments requires the matching switching device to be paired already, with matching device identity and outputs. MycoBox validates the complete assignment set and requires the relevant outputs to confirm OFF before saving it.

A settings file does not restore pairing or the H2 network. Pair and identify the intended device first when setting up a replacement controller. An unfinished H2 update blocks import; exports remain available. Follow [Zigbee setup](zigbee.md) and [Firmware updates](firmware-update.md) to resolve that state.

## If import stops or the result is unknown

Import applies sections in steps. It is **not an all-or-nothing restore**: a failure stops later steps, and completed writes remain applied. There is no automatic rollback. The dialog shows confirmed saves, the current result and remaining operations.

If the outcome is uncertain, reconnect and read the current configuration before retrying. Use **Read current settings** when offered, or reload the controller page if instructed. Review the sections again rather than assuming that nothing changed.

After every selected section saves successfully, import requests one restart. An earlier failed step does not trigger an automatic restart. If all settings saved but the restart was rejected or its result is unknown, **Retry restart** sends only the restart request; it does not repeat settings writes. If the controller has already restarted, reconnect and reload instead.

After reconnecting, check local time, the active cycle, assignments and physical equipment behavior before relying on automatic operation.

[Web interface](web-interface.md) · [Firmware updates](firmware-update.md) · [Zigbee setup](zigbee.md) · [Troubleshooting](troubleshooting.md) · [Documentation](README.md)
