# Getting Started

This guide covers the first startup of a MycoBox controller and the basic configuration required before using it to monitor and control a controlled environment.

---

# 1. Power on the controller

Connect the MycoBox controller to its power supply.

During startup, the Main Controller initializes its configuration, sensors, Zigbee Controller and network connection.

If no Wi-Fi network has been configured yet, MycoBox automatically creates its own Wi-Fi access point.

The network name has the following format:

```text
<controller-name>_AP
```

A new controller is automatically assigned a unique name beginning with `FC`.

For example:

```text
FC123456_AP
```

---

# 2. Connect to the MycoBox access point

On a phone, tablet or computer, open the Wi-Fi settings and connect to the network created by the controller.

Default access point password:

```text
12345678
```

Once connected, open a web browser and access the MycoBox web interface.

The access point is intended primarily for initial configuration and network recovery.

---

# 3. Log in

The MycoBox web interface is protected with authentication.

Default credentials for a new controller are:

```text
Username: admin
Password: admin
```

After completing the initial setup, changing the default credentials is strongly recommended.

The credentials can be changed from:

**System → Authorization**

---

# 4. Configure Wi-Fi

Open:

**System → Network**

The controller can scan for nearby Wi-Fi networks.

Select your network from the list or enter the SSID manually, then provide the Wi-Fi password.

Save the settings.

MycoBox stores the network configuration and automatically restarts.

After restarting, the controller attempts to connect to the configured Wi-Fi network.

If the connection cannot be established, MycoBox can return to Access Point mode so the network settings can be corrected.

---

# 5. Open MycoBox on your local network

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

The IP address assigned by the router can also be used.

> `.local` address support depends on the operating system and local network configuration. If the name does not resolve, use the controller's IP address instead.

---

# 6. Change the controller name

The controller name identifies the MycoBox unit on the local network.

Click the pencil icon next to the controller name in the web interface to edit it.

Choose a short and unique name, especially if several controllers operate on the same network.

Controller names:

* must contain between 3 and 20 characters,
* must start with a letter,
* may contain letters and digits only.

Changing the controller name restarts the Main Controller so the new network name can take effect.

Example:

```text
GrowRoom
```

The controller may then be available as:

```text
http://GrowRoom.local
```

Other examples could include:

```text
PropagationBox
Terrarium
FruitingChamber
Greenhouse
```

---

# 7. Configure time and localization

Open:

**System → Time & Localization**

Correct local time is important for:

* schedules,
* environmental profiles,
* historical measurements,
* day transitions.

MycoBox can synchronize its clock from the network when available.

A hardware RTC provides an offline time source so time-dependent operation does not depend on continuous internet access.

Verify the local time and timezone before configuring schedules or environmental profiles.

---

# 8. Check the sensors

Open:

**Sensors**

Verify that the expected environmental readings are available.

Depending on the installed sensor configuration, MycoBox may display:

* temperature,
* relative humidity,
* CO₂ concentration.

Before enabling automatic control, verify that the displayed measurements are reasonable for the current environment.

A disconnected or incorrectly installed sensor should be corrected before automatic operation is enabled.

CO₂ is currently used as a monitored environmental parameter.

If an SCD4x sensor is installed, open:

**System → Environmental Sensor**

and configure the approximate installation altitude above sea level.

The supported range is:

```text
0–3000 m
```

The value is used by the SCD4x for CO₂ pressure compensation and does not affect SHT3x sensors.

For sensor limitations and compatibility information, see:

[Compatibility](compatibility.md)

---

# 9. Configure Zigbee devices

Open:

**System → Zigbee**

MycoBox uses compatible Zigbee switching devices to control external equipment.

Typical examples include:

* humidifiers,
* ventilation fans,
* heating equipment,
* lighting.

To add a device:

1. Press **Open Zigbee Network**.
2. Put the Zigbee device into pairing mode.
3. Wait for the device to join.
4. Refresh the paired-device list.
5. Test the appropriate outlet or endpoint.
6. Assign it to the required MycoBox function.

Always verify which physical device is being switched before enabling automatic control.

For detailed instructions, see:

[Zigbee Setup](zigbee.md)

---

# 10. Configure environmental control

Open:

**Control**

Start with the simplest configuration appropriate for your application.

A controlled environment does not need to use changing cycles or profiles.

For installations where the desired conditions remain constant, fixed targets and normal equipment schedules may be sufficient.

If your environment requires parameters to change over time, MycoBox can use days and time periods with different target values.

Examples include:

* day and night temperature changes,
* lighting periods,
* different humidity targets during the day,
* changing conditions during plant development,
* terrarium or vivarium day/night profiles,
* controlled environmental experiments.

Configure only the functions required by your installation.

---

# 11. Test every controlled device

Before leaving MycoBox in automatic operation, manually verify all connected equipment.

Check that:

* the Humidifier binding controls the intended humidifier,
* the FAE / Fan binding controls the intended ventilation device,
* the Heatpad binding controls the intended heating equipment,
* the Light binding controls the intended light.

Also verify the correct Zigbee endpoint if a multi-outlet device is used.

Do not assume that endpoint numbering matches the physical outlet numbering.

Be particularly careful when testing heating equipment and other high-power devices.

For additional precautions, see:

[Safety](safety.md)

---

# 12. Observe the environment

After enabling automatic control, observe the system before relying on unattended operation.

Check that:

* sensor values remain reasonable,
* the expected devices switch on and off,
* temperature and humidity move in the expected direction,
* ventilation operates according to its configured timing,
* lighting follows the intended schedule,
* time-dependent changes occur at the expected time.

The initial observation period is also useful for tuning control parameters for the specific enclosure.

---

# Network recovery

If MycoBox can no longer connect to the configured Wi-Fi network, it can return to Access Point mode.

Look for:

```text
<controller-name>_AP
```

Connect to the access point and correct the network configuration.

Default Access Point password:

```text
12345678
```

For additional network troubleshooting, see:

[Troubleshooting](troubleshooting.md)

---

# Factory reset

MycoBox provides a factory-reset procedure that clears the stored Main Controller configuration.

A factory reset should normally be used only when configuration recovery is not possible.

The Main Controller factory reset is separate from the Zigbee network reset available through **Forget paired devices**.

For the current factory-reset procedure and information about what is cleared, see:

[Troubleshooting](troubleshooting.md)

---

# Before unattended operation

Before relying on MycoBox for unattended environmental control, verify:

```text
[ ] Sensor readings are reasonable
[ ] SCD4x installation altitude is configured if applicable
[ ] Local time and timezone are correct
[ ] Required Zigbee devices are paired
[ ] Correct endpoints have been identified
[ ] Every actuator has been tested manually
[ ] Environmental-control settings are correct
[ ] Schedules behave as expected
[ ] Heating equipment operates safely
[ ] Electrical equipment is suitable for the environment
```

See:

[Safety](safety.md)

for additional safety guidance.

---

# Next steps

Continue with:

* [Hardware Overview](hardware-overview.md)
* [Compatibility](compatibility.md)
* [Zigbee Setup](zigbee.md)
* [Firmware Updates](firmware-update.md)
* [Troubleshooting](troubleshooting.md)
* [Safety](safety.md)