# Security Policy

MycoBox is a local environmental-control system that includes Wi-Fi networking, a local web interface, firmware-update functionality and control of external equipment through Zigbee devices.

Security reports are taken seriously, especially when a vulnerability could affect authentication, firmware updates, network access or the control of connected equipment.

---

## Local network access

The web interface uses **HTTP Basic authentication over HTTP on port 80**. MycoBox does not provide built-in HTTPS. A login prompt restricts access, but HTTP does not encrypt credentials or page traffic.

Use MycoBox on a trusted, protected local network. Do not expose its HTTP port directly to the internet or allow untrusted clients onto the controller's access point. Any remote access needs a separately secured network connection; the controller does not provide a cloud account or remote-access service.

Change the factory administrator credentials from **System → Account** during setup. Protect the configured Wi-Fi network with its own strong password. The web account controls equipment, settings and firmware updates, so share it only with people authorized to perform those operations. On a shared computer, do not assume that closing a tab clears credentials retained by the browser.

The controller's access point uses the fixed password `12345678`. Changing the administrator account or saved Wi-Fi password does not change this access-point password. Treat the AP as a setup and recovery connection and restrict access to the controller and its radio range.

Saved passwords are not displayed in the account and network forms. This is not a claim that HTTP traffic, browser storage or every diagnostic export is safe to publish.

**System → Backup & restore** exports settings without saved passwords or keys, and diagnostics without passwords. These files can still include network names, account names, device addresses, measurements and configuration details. Store them privately and review them before sharing. Import only settings files from a source you trust, check the selected sections and remember that applying them can operate equipment. See [Backup & restore](docs/backup-restore.md).

## Firmware and physical access

Download updates from the official [MycoBox Releases](https://github.com/Moffefe/MycoBox/releases) page. Use the file for the correct controller and follow [Firmware Updates](docs/firmware-update.md), including checksum verification when supplied.

The Main Controller validates its dedicated encrypted OTA package. Firmware encryption does not encrypt the local web connection and is not a guarantee that all software or physical attacks are prevented. Do not substitute a plain application, recovery image or firmware for another device.

The current Zigbee updater accepts the matching H2 application OTA package after the required S3 update. A full H2 recovery image is a different format and is rejected by the current web form. The H2 package's integrity checks do not by themselves authenticate its publisher; obtain it from the official release and verify the published checksum.

Keep physical access to the controller, service connections and powered actuators limited to trusted people. Pair the intended Zigbee device during the pairing window, then identify and test its detected outputs. Pairing and an ON/OFF acknowledgement do not establish that connected equipment is physically safe or operating correctly.

---

## Supported versions

Security fixes are normally targeted at the latest public MycoBox release.

| Version | Supported |
| --- | --- |
| Latest public release | Yes |
| Older releases | Best effort only |
| Development or unofficial builds | No guarantee |

Check the release notes for fixes and compatibility requirements, and include the installed version in a report. Do not delay reporting a suspected vulnerability merely because the affected installation runs an older release.

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
- a short, relevant event excerpt or screenshot with sensitive information removed,
- whether the issue requires local network access, physical access or authentication.

Do not include real Wi-Fi passwords, authentication credentials, firmware encryption keys, tokens, browser authentication headers or other secrets. Review screenshots and event details for network names, device addresses and other identifying information before sharing. Do not upload complete memory dumps, browser captures or unreviewed diagnostic archives to a public issue.

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
- control of Zigbee-assigned equipment without authorization,
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
