# Changelog

This file contains user-visible changes introduced in MycoBox firmware releases.

MycoBox uses version identifiers in the following form:

```text
MAJOR.BUILD.LANGUAGE
```

Example:

```text
1.618.EN
```

Where:

* `MAJOR` identifies the main software generation,
* `BUILD` identifies the firmware build,
* `LANGUAGE` identifies the UI language included in the build.

---

## [Unreleased]

### Added

* Initial public MycoBox documentation.
* Getting Started guide.
* Hardware architecture overview.
* Zigbee setup and device binding guide.
* Firmware update documentation.

### Changed

* None.

### Fixed

* None.

---

## Release history

Public firmware releases will be listed below this section.

Each release entry may contain:

### Added

New features.

### Changed

Changes to existing behavior.

### Fixed

Bug fixes.

### Security

Security-related changes.

### Firmware

Information about which controller firmware is included or must be updated.

Example:

```text
## [1.618.EN] - 2026-09-11

### Added

- Initial public firmware release.

### Firmware

- ESP32-S3 Main Controller: update required.
- ESP32-H2 Zigbee Controller: update required.

### Important

- Zigbee devices must be paired again after updating the ESP32-H2.
```
