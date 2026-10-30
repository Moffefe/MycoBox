<p align="center">
  <img src="media/mycobox-hero.png" alt="MycoBox logo and project name" width="360">
</p>

**Local climate automation for your growing space.**

Monitor temperature and humidity, follow your growing cycle and control humidification, ventilation, heating and lighting from one local interface. MycoBox runs on the controller, with access from a phone or computer.

[Project website](https://moffefe.github.io/MycoBox/) · [Getting started](docs/getting-started.md) · [Firmware releases](https://github.com/Moffefe/MycoBox/releases) · [Compatibility](docs/compatibility.md)

## Your growbox at a glance

<p align="center">
  <img src="media/web-ui/dashboard.png" alt="MycoBox Overview with Growbox visualization, current readings and cycle settings" width="1000">
</p>

Overview combines a Growbox visualization with current temperature and humidity, measurement freshness, the active cycle and equipment assignments. See the confirmed state of **Humidifier**, **Fan**, **Light** and **Heat** in one place.

Local warnings highlight persistent environmental deviations. The panel also shows when current conditions cannot be assessed.

## Measurements and activity

<p align="center">
  <img src="media/web-ui/measurements.png" alt="MycoBox 24-hour temperature and humidity history with Fan activity and recovery after ventilation" width="1000">
</p>

The **Sensirion SHT41** measures temperature and relative humidity. Charts place these readings alongside activity tracks for **Humidifier**, **Fan**, **Heat** and **Sensor heater**, making environmental changes easier to follow.

The panel holds up to **288 samples at five-minute intervals**, approximately 24 hours of continuous operation. History is kept in memory and starts again after a restart. Activity tracks show confirmed output states and commands rather than physical measurements of equipment operation.

## Cycle and automation

<p align="center">
  <img src="media/web-ui/cultivation-cycle.png" alt="MycoBox cycle editor with Fruiting mode, Adaptive humidification and four daily time points" width="1000">
</p>

Build a cycle of up to **32 days**, with up to **four time points per day**. Use the same settings throughout or change targets as the cycle progresses.

| Function | Control |
| --- | --- |
| Humidification | Scheduled ON/OFF periods in Timer mode, or adaptive pulses guided by humidity readings and target |
| Fan | Configurable ON and OFF periods |
| Heat | Temperature control using the active schedule |
| Light | A daily light window |
| Incubation | Fan and light set to OFF, fixed heating thresholds, selected humidification mode retained |

Schedule changes take effect in memory. Use **Save cycle** to keep them after a restart.

Adaptive V1.4 learns the response of the growing space and humidifier. It allows at least **five minutes between starts** and limits each run to **two minutes**. Timer mode keeps its configured ON/OFF periods.

## Zigbee equipment

<p align="center">
  <img src="media/web-ui/zigbee-settings.png" alt="MycoBox Zigbee page showing one paired device and four independent assignments" width="1000">
</p>

Pair **one compatible Zigbee outlet or power strip** and assign a different output to each function: **Humidifier**, **Fan**, **Light** and **Heat**.

MycoBox detects the available ON/OFF outputs and supports up to 32 detected outputs. Check compatibility and independent switching with your actual device before automatic operation.

[Zigbee setup](docs/zigbee.md) · [Compatibility](docs/compatibility.md)

## Activity log

Follow equipment events with readable descriptions and action hints. Sort the loaded entries by time, event or message, and open **Technical details** when more diagnostic information is needed.

## Local control on phones and computers

<p align="center">
  <img src="media/web-ui/dashboard-mobile.png" alt="MycoBox Overview at a mobile viewport" width="350">
</p>

The web interface and its assets are stored on MycoBox. Normal control works without a cloud account or a permanently connected computer. Connect through your local Wi-Fi network or the controller's access point.

A working, initialized hardware RTC keeps local time available without internet. NTP synchronization is optional. Basic status is also available on the controller's display.

## Backup and restore

Use **System → Backup & restore** to export settings as JSON, download a diagnostics ZIP or restore selected settings from a previous copy.

This requires firmware with the **Backup & restore** section. If it is absent, check the release notes for a version that supports it.

Choose which sections to import and review the changes before applying them. Backups include the active cycle, even with unsaved edits, but exclude passwords, firmware, the learned humidity model and Zigbee network pairing. Importing assignments requires the same compatible paired device. An import can stop after some sections have been saved; review its result before retrying. A completed import restarts the controller.

[Backup and restore guide](docs/backup-restore.md)

## Multiple controllers

The **Cluster** page finds other MycoBox controllers on the local network. **Copy settings…** copies the light-schedule enable setting, humidification mode and growing mode. **Copy cycle…** replaces and saves recipients' schedules and start dates, including the source controller's unsaved cycle edits.

Review the listed recipients before confirming. Recipients need the same administrator login and password. Check each controller after an incomplete group operation.

## Firmware updates

<p align="center">
  <img src="media/web-ui/firmware-settings.png" alt="MycoBox Main Controller firmware update section" width="1000">
</p>

Update the **ESP32-S3 Main Controller** from **System → Main Controller firmware** and the **ESP32-H2 Zigbee Controller** from the **Zigbee** page.

S3 OTA preserves saved settings. The current H2 application OTA package preserves the Zigbee network, paired device and saved assignments on compatible hardware. **Update S3 to a version supporting that package first**, then update H2 and wait for verification to finish before checking the outputs.

The full H2 image supplied with older releases is a different format and replaces Zigbee data. The current web updater accepts only an H2 OTA package. Follow the release notes to select compatible firmware and the correct update order.

[Download firmware](https://github.com/Moffefe/MycoBox/releases) · [Update instructions](docs/firmware-update.md)

## Documentation

- [Getting started](docs/getting-started.md)
- [Hardware overview](docs/hardware-overview.md)
- [Compatibility](docs/compatibility.md)
- [Zigbee setup](docs/zigbee.md)
- [Firmware updates](docs/firmware-update.md)
- [Backup and restore](docs/backup-restore.md)
- [Web interface and controller groups](docs/web-interface.md)
- [Troubleshooting](docs/troubleshooting.md)
- [Roadmap](docs/roadmap.md)
- [Safety](docs/safety.md)
- [Security policy](SECURITY.md)

Use connected equipment within its electrical ratings and verify every output before unattended operation. Local warnings help with monitoring; they do not replace equipment safety protections.

