# Getting Started

This guide covers the first startup of a MycoBox controller and the basic configuration required before using it to control a growing chamber.

## 1. Power on the controller

Connect the MycoBox controller to its power supply.

During startup, the Main Controller initializes its internal configuration, sensors, Zigbee controller and network connection.

If no Wi-Fi network has been configured yet, MycoBox automatically creates its own Wi-Fi access point.

The network name has the following format:

```text
<controller-name>_AP
```

A new controller is automatically assigned a unique controller name beginning with `FC`.

For example:

```text
FC123456_AP
```

## 2. Connect to the MycoBox access point

On a phone, tablet or computer, open the Wi-Fi settings and connect to the network created by the controller.

Default access point password:

```text
12345678
```

Once connected, open a web browser and access the controller web interface.

> The access point is intended primarily for initial configuration and network recovery.

## 3. Log in

The MycoBox web interface is protected with authentication.

Default credentials for a new controller are:

```text
Username: admin
Password: admin
```

After completing the initial setup, changing the default credentials is strongly recommended.

The credentials can be changed from:

**System → Authorization**

## 4. Configure Wi-Fi

Open:

**System → Network**

The controller can scan for nearby Wi-Fi networks.

Select your network from the list or enter the SSID manually, then provide the Wi-Fi password.

Save the settings.

MycoBox will store the network configuration and automatically restart.

After restarting, the controller will attempt to connect to the configured Wi-Fi network.

If the connection cannot be established, MycoBox will eventually return to Access Point mode so the network settings can be corrected.

## 5. Open MycoBox on your local network

When connected to your normal Wi-Fi network, MycoBox can be accessed using its local network address.

The controller also advertises its configured device name using mDNS.

The address therefore normally has the following form:

```text
http://<controller-name>.local
```

For example:

```text
http://FC123456.local
```

The exact IP address assigned by the router can also be used.

> `.local` address support depends on the operating system and local network configuration. If the name does not resolve, use the controller's IP address instead.

## 6. Change the controller name

The controller name identifies the MycoBox unit on the network.

It is also used for local network discovery.

The name can be changed from the main web interface.

Choose a short and unique name, especially if multiple MycoBox controllers will operate on the same network.

Example:

```text
FruitingChamber
```

The controller can then be available as:

```text
http://FruitingChamber.local
```

## 7. Configure time and localization

Open:

**System → Time & Localization**

Configure the timezone appropriate for the controller location.

Automatic time synchronization can be enabled when the controller has network access.

Correct time configuration is important because cultivation cycles, schedules and historical measurements depend on the controller clock.

## 8. Check the sensors

Open the **Sensors** page.

Verify that the environmental measurements are available and plausible.

Depending on the installed sensor configuration, MycoBox can monitor:

* temperature,
* relative humidity,
* CO₂ concentration.

Do not start automatic climate control until the installed sensors are reporting valid measurements.

## 9. Configure Zigbee devices

Open:

**System → Zigbee**

MycoBox uses its dedicated ESP32-H2 controller to communicate with compatible Zigbee switching devices.

Currently supported actuator types include:

* Zigbee switches,
* Zigbee smart plugs,
* Zigbee power strips.

To add a new device:

1. Select **Open Zigbee Network**.
2. The Zigbee network will remain open for pairing for a limited time.
3. Put the Zigbee device into pairing mode.
4. Wait for it to appear in the MycoBox device list.
5. Test the outlet using the available ON/OFF controls.
6. Assign the appropriate outlet to a MycoBox function.

Typical assignments include:

* humidifier,
* ventilation fan,
* heater,
* lighting.

Each controlled chamber function should be assigned to the correct physical Zigbee outlet before automatic control is enabled.

## 10. Configure the cultivation cycle

Open the **Control** page.

The cultivation cycle defines how environmental conditions should change over time.

Configure the required parameters for the mushroom species and cultivation stage being used.

Before leaving the chamber unattended, verify that:

* humidity targets are correct,
* temperature targets are correct,
* lighting schedule is correct,
* ventilation behavior is appropriate,
* Zigbee devices are assigned to the correct functions.

## 11. Test the system

Before starting an unattended cultivation cycle, manually verify each controlled device.

Confirm that:

* the humidifier switches correctly,
* fans switch correctly,
* heating equipment switches correctly,
* lighting switches correctly,
* sensor values react as expected,
* each Zigbee outlet controls the intended physical device.

Never assume an outlet assignment is correct without testing it.

## 12. Ready for operation

Once networking, time, sensors, Zigbee devices and cultivation settings are configured, MycoBox can operate locally without requiring a continuously connected computer or cloud service.

Normal climate-control logic is executed directly by the controller.

---

## If you lose network access

If MycoBox cannot establish its configured Wi-Fi connection, it can return to Access Point mode.

Look for a Wi-Fi network ending with:

```text
_AP
```

Connect to it and correct the network configuration from the web interface.

---

## Factory reset

MycoBox supports a factory reset during controller startup.

Factory reset removes the stored controller configuration and should only be used when normal configuration recovery is not possible.

Detailed factory-reset instructions will be provided in the troubleshooting documentation.

---

## Next steps

After the initial setup, continue with:

* [Hardware Overview](hardware-overview.md)
* [User Guide](user-guide.md)
* [Cultivation Cycles](cultivation-cycle.md)
* [Zigbee Setup](zigbee.md)
* [Firmware Updates](firmware-update.md)
* [Troubleshooting](troubleshooting.md)
