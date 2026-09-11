# MycoBox vX.XXX.EN

Short summary of the release.

## What's new

### Added

* New feature or capability.

### Changed

* Change to existing behavior.

### Fixed

* Fixed issue.

Remove empty sections before publishing the release.

---

## Firmware included

| Controller                 | Update required | File                           |
| -------------------------- | --------------- | ------------------------------ |
| ESP32-S3 Main Controller   | Yes / No        | `MycoBox-S3-OTA-vX.XXX.EN.bin` |
| ESP32-H2 Zigbee Controller | Yes / No        | `MycoBox-H2-vX.XXX.EN.bin`     |

Only download and install firmware listed as required for this release.

---

## Update instructions

### ESP32-S3 Main Controller

If an S3 update is required:

1. Download `MycoBox-S3-OTA-vX.XXX.EN.bin`.
2. Open the MycoBox web interface.
3. Go to **System → Firmware**.
4. Select the downloaded firmware.
5. Start the update.
6. Keep the controller powered and the browser page open.
7. Wait for MycoBox to restart.
8. Verify the installed version.

See:

[Main firmware update instructions](firmware-update.md)

---

### ESP32-H2 Zigbee Controller

If an H2 update is required:

1. Download `MycoBox-H2-vX.XXX.EN.bin`.
2. Open the MycoBox web interface.
3. Go to **System → Zigbee**.
4. Select the Zigbee Controller firmware.
5. Start the update.
6. Do not disconnect power during programming.
7. Wait for the Zigbee Controller to restart.
8. Pair Zigbee devices again.
9. Verify all actuator bindings and test ON/OFF operation.

See:

[Zigbee setup](zigbee.md)

and:

[Firmware update instructions](firmware-update.md)

---

## Important notes

* Do not disconnect power during a firmware update.
* Use firmware only with compatible MycoBox hardware.
* Do not upload ESP32-H2 firmware through the Main Controller OTA page.
* Do not upload ESP32-S3 OTA firmware through the Zigbee Controller updater.
* ESP32-H2 updates require Zigbee devices to be paired again afterwards.

---

## Downloads

Public release assets may include:

```text
MycoBox-S3-OTA-vX.XXX.EN.bin
MycoBox-H2-vX.XXX.EN.bin
SHA256SUMS.txt
```

Not every release needs to contain both firmware files.

Only firmware changed or required by the release should be published.

Recovery images, development firmware and production provisioning files are not distributed through public GitHub Releases.

---

## File integrity

SHA-256 hashes for public firmware files are provided in:

```text
SHA256SUMS.txt
```

The calculated hash of a downloaded firmware file should match the value published with the release.

---

## Known issues

* None known.

Replace this section with any known release-specific limitations.

---

## Documentation

* [Getting Started](getting-started.md)
* [Hardware Overview](hardware-overview.md)
* [Zigbee Setup](zigbee.md)
* [Firmware Updates](firmware-update.md)
