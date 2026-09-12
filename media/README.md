# Media

This directory contains public visual assets used by the MycoBox documentation.

## Directory structure

```text
media/
├── controller/
├── web-ui/
└── diagrams/
```

### `controller/`

Public product photography.

Recommended filenames:

```text
mycobox-controller-hero.jpg
mycobox-controller-installed.jpg
mycobox-controller-connections.jpg
```

### `web-ui/`

Screenshots of the MycoBox local web interface.

Recommended filenames:

```text
dashboard.png
sensors.png
control.png
cultivation-cycle.png
zigbee.png
network.png
```

### `diagrams/`

Architecture and system diagrams.

Recommended filenames:

```text
system-architecture.svg
control-flow.svg
```

## Image guidelines

- Use the English UI for public documentation.
- Prefer clean screenshots without browser tabs, bookmarks or unrelated desktop content.
- Do not expose passwords, authentication credentials, Wi-Fi credentials, IP addresses, MAC addresses, Zigbee IEEE addresses, serial numbers or other device identifiers.
- Do not publish encryption keys, QR codes containing secrets, provisioning information or internal production tooling.
- Product photography should focus on the finished controller and normal user-accessible connections.
- Avoid internal PCB photography unless it is intentionally approved for public documentation.

## Recommended dimensions

| Asset | Recommended format | Recommended size |
| --- | --- | --- |
| Hero product photo | JPG | 1800-2400 px wide |
| Installed controller photo | JPG | 1600-2400 px wide |
| Web UI screenshot | PNG | 1440-1920 px wide |
| Architecture diagram | SVG | Vector |
| Other diagrams | SVG | Vector |

Keep image files reasonably compressed so the repository remains quick to browse.
