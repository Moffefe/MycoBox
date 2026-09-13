# Security Policy

MycoBox is a local environmental-control system that includes Wi-Fi networking, a local web interface, firmware-update functionality and control of external equipment through Zigbee devices.

Security reports are taken seriously, especially when a vulnerability could affect authentication, firmware updates, network access or the control of connected equipment.

---

## Supported versions

Security fixes are normally targeted at the latest public MycoBox release.

| Version | Supported |
| --- | --- |
| Latest public release | Yes |
| Older releases | Best effort only |
| Development or unofficial builds | No guarantee |

Users should update to the latest stable release before reporting a problem that may already have been fixed.

---

## Reporting a vulnerability

**Do not publish vulnerability details in a public GitHub Issue.**

If GitHub private vulnerability reporting is enabled for this repository, use the repository's **Report a vulnerability** option under the **Security** tab.

Please include, when applicable:

- affected MycoBox version,
- affected controller: ESP32-S3, ESP32-H2 or both,
- clear description of the vulnerability,
- steps required to reproduce it,
- expected security boundary,
- actual behavior,
- potential impact,
- logs or screenshots with secrets removed,
- whether the issue requires local network access, physical access or authentication.

Do not include real Wi-Fi passwords, authentication credentials, firmware encryption keys, tokens or other secrets.

If private vulnerability reporting is not available, do not post exploit details publicly. Open a minimal public issue requesting a private contact path, without including technical details that would enable exploitation.

---

## Scope

Examples of security-relevant reports include:

- authentication bypass,
- unauthorized access to the local web interface,
- exposure of stored credentials or secrets,
- unsafe firmware-update validation,
- unintended firmware installation,
- network-access vulnerabilities,
- remote control of Zigbee-bound equipment without authorization,
- injection or cross-site scripting in the web interface,
- vulnerabilities that can persist across reboot or configuration changes.

General bugs, compatibility questions and feature requests should be reported through normal GitHub Issues instead.

---

## Safety-related impact

MycoBox can control physical equipment such as:

- heaters,
- humidifiers,
- fans,
- lighting,
- other mains-powered devices connected through Zigbee switches or relays.

A software or security defect may therefore have physical consequences.

If a suspected vulnerability causes unsafe equipment behavior, disconnect or isolate the affected equipment when it can be done safely and do not continue unattended operation until the issue is understood.

MycoBox must not be used as the only safety mechanism for applications where failure could cause serious injury, fire, dangerous overheating or other hazardous conditions.

See [Safety](docs/safety.md).

---

## Disclosure

Please allow reasonable time for investigation and remediation before publishing technical details of a confirmed vulnerability.

Once a fix is available, affected users should update to the corrected public release as soon as practical.
