# Backup and restore

Use **System → Backup & restore** to save a copy of your settings, restore selected sections or download information for troubleshooting. All three work without internet.

## Export settings

Choose **Export settings**. Your browser downloads `mycobox-settings.json`.

| Section | What it saves |
| --- | --- |
| Growing profile | Daily schedule, time points and light windows |
| Control settings | Growing mode, humidification mode and light-schedule setting |
| Cycle progress | Cycle start time |
| System | Controller name, time mode and timezone |
| Wi-Fi network | Network name |
| Administrator account | Login name |
| Zigbee assignments | The four equipment assignments |

The copy includes active schedule edits, even if you have not saved them yet. Use **Save cycle** as well to keep those edits on MycoBox after a restart.

Passwords, Zigbee pairing, firmware and Adaptive's learned response are not included.

## Export diagnostics

Choose **Export diagnostics** to download `mycobox-diagnostics.zip`. It collects the currently available history and system information in one file.

| File | Contents |
| --- | --- |
| `manifest.json` | What the export covers and any current warnings |
| `measurements.csv` | Measurements and recent control samples |
| `events.csv` | Equipment and sensor events |
| `report.txt` | System information |

Download this before restarting if you need to investigate a problem: a restart clears history, and older records are replaced as memory fills. Use the settings JSON, rather than this ZIP, when restoring settings.

Exports omit saved passwords but include names, addresses and configuration. Keep them private and review them before sharing.

## Import selected settings

Stay nearby during import, as saved changes can affect equipment immediately.

1. Choose **Import settings** and open your MycoBox settings JSON file, up to **32 KiB**.
2. Select what to restore. **Growing profile** and **Control settings** are selected initially. Everything you leave unchecked keeps its current value.
3. Enter passwords where requested. A new Wi-Fi network needs its password, or the open-network option. For the same saved network, a blank password keeps the existing one. Choose separately whether to keep or replace the administrator password.
4. If prompted about unsaved cycle edits, choose **Save current cycle and continue** to keep them, or cancel.
5. Choose **Review selected settings** and check the preview.
6. Select **Import these sections and restart the controller**, then **Import and restart**.
7. Wait for the restart and reconnect. Use the new address or login if you restored a different controller name, network or account.

To reuse a growing profile from Day 1 of a new run, leave **Cycle progress** unchecked and set the new cycle start separately. **System** restores the time mode and timezone; it keeps the current clock time.

### Zigbee assignments

The original switch must already be paired, with the same outputs available. MycoBox checks the assignments and turns affected outputs OFF before saving them.

On a replacement controller, [pair the switch first](zigbee.md). A settings file does not restore pairing.

If an unfinished Zigbee Controller update blocks import, [complete that update](firmware-update.md#if-an-h2-update-is-interrupted) first. You can still export settings and diagnostics.

## If import stops or the result is unknown

Check the dialog to see which sections were saved. Those changes stay in place even if a later step fails.

Choose **Read current settings**, or reconnect and reload the panel, before trying again. Correct the reported problem and review the sections you still want to import.

If the settings were saved but the restart failed, choose **Retry restart**. If MycoBox already restarted, just reconnect.

Finally, check the restored settings and [equipment operation](safety.md#before-leaving-the-system-unattended).
