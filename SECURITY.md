# Security Policy

MycoBox security covers local network access, firmware updates, stored configuration and control of connected equipment.

## Local network access

The web interface uses **HTTP Basic authentication over HTTP on port 80**, without built-in HTTPS. Authentication restricts access; HTTP does not encrypt credentials or page traffic.

Use a trusted, protected local network. Do not expose the HTTP port directly to the internet or admit untrusted clients to the access point. Remote access requires a separately secured network connection; MycoBox provides no cloud account or remote-access service.

Replace factory administrator credentials during [initial setup](docs/getting-started.md#3-log-in) and protect the configured Wi-Fi with a strong password. The administrator account authorizes equipment control, configuration and firmware updates. Share it only with authorized people. Closing a tab on a shared computer may leave authentication cached by the browser.

The controller AP has the fixed password `12345678`. Changing the administrator credentials or saved Wi-Fi password does not change it. Treat the AP as a setup/recovery connection and restrict physical and radio access.

## Configuration and diagnostic data

Saved passwords are hidden in the account/network forms and excluded from settings and diagnostic exports. Settings backups also omit Zigbee network keys. This does not make HTTP traffic or exported files safe to publish.

Files may still contain network/account names, device addresses, measurements and configuration. Store them privately, review identifying information before sharing and import settings only from a trusted source. See [Backup and restore](docs/backup-restore.md) for file contents and import behavior.

## Firmware and physical access

Obtain packages from official [MycoBox Releases](https://github.com/Moffefe/MycoBox/releases), check published SHA-256 values and use the correct controller format. Follow [Firmware updates](docs/firmware-update.md) for compatibility and installation.

The S3 validates its dedicated encrypted OTA package. Firmware encryption does not protect the HTTP connection or guarantee resistance to every software or physical attack. H2 package integrity checks do not by themselves authenticate the publisher; trusted provenance still matters.

Limit access to the controller, service connections and powered actuators to trusted people. Pair only the intended Zigbee device. A security defect can have physical consequences; use the precautions in [Safety](docs/safety.md).

## Supported versions

| Version | Security-fix support |
| --- | --- |
| Latest public release | Yes |
| Older releases | Best effort |
| Development or unofficial builds | No guarantee |

Read release notes for fixes and compatibility requirements. Report suspected vulnerabilities even when they affect an older version.

<a id="scope"></a>

## Reporting a vulnerability

**Do not publish exploit details in a public GitHub Issue.** Security reports include authentication bypass, secret exposure, injection/XSS, unsafe update validation, unauthorized equipment control, network vulnerabilities and defects that persist across restart or configuration changes.

If private vulnerability reporting is enabled, use **Security → Report a vulnerability** in this repository. Otherwise, open a minimal public issue requesting a private contact route, without exploitation details.

Include:

- affected firmware version and controller: S3, H2 or both;
- a clear description and reproduction steps;
- expected security boundary, actual behavior and potential impact;
- whether exploitation needs authentication, local network access or physical access;
- a short, relevant excerpt or screenshot with sensitive information removed.

Exclude Wi-Fi passwords, credentials, encryption keys, tokens, browser authentication headers and other secrets. Do not post unreviewed diagnostic archives, full memory dumps or browser captures publicly. General bugs, compatibility questions and feature requests belong in normal GitHub Issues.

<a id="safety-related-impact"></a>

## Disclosure

Allow reasonable time for investigation and remediation before publishing confirmed vulnerability details. Update affected installations when a corrected public release is available. If equipment behaves unsafely, isolate it when safe and follow [Safety](docs/safety.md#in-case-of-unexpected-behavior).