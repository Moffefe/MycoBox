# Backup and restore

Open **System → Backup & restore** to download settings or diagnostics and import selected configuration. Operations work locally, including through the access point without internet.

## Export settings

Choose **Export settings** and check browser downloads for `mycobox-settings.json`.

| Section | Included settings |
| --- | --- |
| Growing profile | Daily schedule, time points and light windows |
| Control settings | Growing mode, humidification mode and light-schedule enable setting |
| Cycle progress | Cycle start time |
| System | Controller name, time mode and timezone |
| Wi-Fi network | Saved SSID |
| Administrator account | Login name |
| Zigbee assignments | All four equipment assignments |

The file captures current configuration, including active **unsaved schedule edits**, marked in its information. Export does not save those edits on the controller; use **Save cycle** to retain them after restart.

Settings omit Zigbee network keys, firmware and the learned Adaptive model. Import does not restore controller security or recover an interrupted update.

## Export diagnostics

Choose **Export diagnostics** to download `mycobox-diagnostics.zip`. The browser creates it locally from one controller snapshot.

| File | Contents |
| --- | --- |
| `manifest.json` | Source information, retained ranges, history limits and current warnings |
| `measurements.csv` | Retained historical measurements and recent control samples |
| `events.csv` | Retained Humidifier, Fan, Light, Heat and sensor events |
| `report.txt` | System report |

This is a snapshot of currently retained memory, not a permanent growing-cycle record. Restart clears history; full buffers replace their oldest records. A diagnostic ZIP cannot be imported as settings.

Neither export includes saved passwords. Both can reveal controller identity, network/account names, device addresses or configuration: store them privately and review before sharing.

## Import selected settings

Keep equipment supervised: each successful step can affect operation before the final restart.

1. Choose **Import settings** and select a supported MycoBox settings JSON, up to **32 KiB**. Review its source, firmware and export information.
2. Select sections from the settings table above. **Growing profile** and **Control settings** are selected by default; others require separate selection. Unselected sections keep local values.
3. Supply required passwords. A new SSID needs a password or an explicit open-network choice; a blank password for the same saved SSID keeps this controller's existing password. Keep or replace the administrator password separately.
4. Save any unsaved cycle on the destination first. **Save current cycle and continue** explicitly saves it and returns to validation, without confirming import. You can cancel instead.
5. Choose **Review selected settings**. Preview and validation do not write imported settings.
6. After validation, select **Import these sections and restart the controller**, then **Import and restart**.
7. Wait for the result, reconnect and read back configuration. Changed network, controller name or account may require another address or login.

Confirmation writes all selected sections, even values already matching. **System** restores time mode and timezone while keeping the current clock. **Cycle progress** restores the cycle start time; leave it unselected when reusing a profile without its progress.

### Zigbee assignments

The matching switching device must already be paired with matching identity and outputs. Import validates and saves the complete assignment set together, requiring affected outputs to confirm OFF. It cannot recreate the Zigbee network or pairing; use [Zigbee setup](zigbee.md) first for a replacement controller.

An unfinished H2 update blocks import while exports remain available. Resolve it through [Firmware updates](firmware-update.md).

## If import stops or the result is unknown

A failed step stops later steps; completed writes stay applied, without automatic rollback. The dialog lists confirmed saves, the current result and remaining operations. Read current configuration before reviewing another import. Use **Read current settings** when offered, or reconnect and reload if instructed after an uncertain result.

Successful writes to every selected section trigger one restart request. Earlier failure does not restart automatically. If only restart failed or was unconfirmed, **Retry restart** sends that request alone, without repeating writes. If restart already occurred, reconnect and reload instead.

After reconnecting, check configuration and physical operation using the [unattended-operation checklist](safety.md#before-leaving-the-system-unattended).
