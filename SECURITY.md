# Security Policy

Protect access to MycoBox as you would access to the equipment it controls.

## Local network access

Use MycoBox on a trusted local network. Its web connection uses HTTP and is not encrypted, so keep it off public Wi-Fi and do not forward its port to the internet.

[Replace the factory administrator login](docs/getting-started.md#3-log-in) and use a strong Wi-Fi password. Share the administrator account only with people who should control the equipment. On a shared computer, avoid leaving a saved login.

The setup access point uses the fixed password `12345678`. Changing the administrator or home Wi-Fi password does not change that access point password. Use it for setup and recovery.

For remote access, use a separately secured connection to your local network.

## Configuration and diagnostic data

Backups and diagnostic exports leave out saved passwords, but can contain network names, account names, device addresses and measurements.

Keep these files private, check them before sharing and import settings from sources you trust. See [Backup and restore](docs/backup-restore.md).

## Firmware and physical access

Download firmware from [official MycoBox Releases](https://github.com/Moffefe/MycoBox/releases). The [update guide](docs/firmware-update.md) explains file selection, checksum checking and installation.

Keep the controller, service connections and powered equipment accessible only to trusted people. Pair the Zigbee switch you intend to use.

## Supported versions

Use the latest public release for security fixes. Support for older versions is provided on a best-effort basis; development and unofficial builds are outside the public release support policy.

Report a suspected vulnerability even if you found it in an older version.

<a id="scope"></a>

## Reporting a vulnerability

Report security problems privately, including unauthorized access, exposed passwords or equipment control without permission.

Use **Security → Report a vulnerability** if that option is available in the repository. Otherwise, open a short issue asking for a private contact route, without describing how to exploit the problem.

Include:

- the affected controller and firmware version;
- steps to reproduce the problem;
- what happened and its possible impact;
- whether it needs a login, local network access or physical access;
- a relevant screenshot or short log excerpt, with private details removed.

Leave out passwords, keys, tokens and browser login headers. Use [normal issues](https://github.com/Moffefe/MycoBox/issues) for general bugs and setup questions.

<a id="safety-related-impact"></a>

## Disclosure

Coordinate publication with the maintainer so there is time to investigate and prepare a fix. Install the corrected release when it is available.

If equipment behaves unexpectedly, follow [Safety](docs/safety.md#in-case-of-unexpected-behavior) while the issue is being resolved.
