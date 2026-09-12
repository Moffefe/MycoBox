# Troubleshooting

This guide covers common problems that may occur while configuring or operating MycoBox.

Start with the simplest checks first:

1. Confirm that the controller has stable power.
2. Wait for the startup process to complete.
3. Verify that the expected Wi-Fi network is available.
4. Check the MycoBox web interface.
5. Review sensor and Zigbee status.
6. Restart the controller only if necessary.

---

# MycoBox is not available on the network

If the controller cannot be reached from the browser, first determine whether it is connected to the configured Wi-Fi network or operating in Access Point mode.

---

## Try the local hostname

MycoBox normally advertises its configured name using mDNS.

Try:

```text
http://<controller-name>.local
```

For example:

```text
http://FC123456.local
```

or, if the controller has been renamed:

```text
http://GrowRoom.local
```

---

## `.local` does not work

mDNS support depends on the operating system, browser and local network.

If the `.local` address does not resolve:

1. Find the IP address assigned to MycoBox by your router.
2. Open that address directly in the browser.

For example:

```text
http://192.168.1.120
```

A working IP address with a non-working `.local` name usually indicates an mDNS or local network discovery problem rather than a MycoBox control problem.

---

# MycoBox created its own Wi-Fi network

If MycoBox cannot connect to the configured Wi-Fi network, it can return to Access Point mode.

Look for a network named:

```text
<controller-name>_AP
```

For example:

```text
FC123456_AP
```

Default Access Point password:

```text
12345678
```

Connect to the access point and open the MycoBox interface.

Then go to:

**System → Network**

and verify the Wi-Fi configuration.

---

# MycoBox does not connect to Wi-Fi

Open:

**System → Network**

Check:

* Wi-Fi network name,
* Wi-Fi password,
* whether the selected network is currently available,
* whether the controller is within reasonable Wi-Fi range.

You can use the network scan to confirm that the access point is visible.

If necessary, enter the SSID manually.

After saving network settings, MycoBox restarts and attempts to connect using the new configuration.

If the connection cannot be established, the controller can return to Access Point mode.

---

# I changed Wi-Fi settings and lost access

This is expected while the controller restarts and reconnects.

Wait for the restart to complete.

Then try:

```text
http://<controller-name>.local
```

or use the new IP address assigned by the router.

If the configured Wi-Fi network cannot be reached, look for:

```text
<controller-name>_AP
```

and correct the network settings from Access Point mode.

---

# I cannot log in

A new controller uses:

```text
Username: admin
Password: admin
```

If the credentials were changed, use the configured username and password.

Authentication settings are available under:

**System → Authorization**

If the configured credentials are no longer known, a factory reset may be required.

> A factory reset clears stored controller configuration.

---

# Sensor values are missing

Open:

**Sensors**

Current MycoBox firmware supports sensors from the:

* Sensirion SCD4x family,
* Sensirion SHT3x family.

Depending on the installed hardware, expected measurements may include:

* temperature,
* relative humidity,
* CO₂ concentration.

If a value is missing:

1. Check that the expected sensor is physically connected.
2. Restart MycoBox and check the Sensors page again.
3. Verify that the sensor type is supported.
4. Check whether other values from the same sensor are also unavailable.

Do not enable automatic environmental control based on a sensor that is not reporting valid measurements.

---

# Sensor values look incorrect

Allow the sensor some time to stabilize after startup.

Compare the reading with the actual environment.

Large differences may indicate:

* sensor placement near a humidifier outlet,
* sensor placement near a heater,
* direct airflow from a fan,
* condensation on or around the sensor,
* an unsuitable mounting position.

For useful environmental control, the sensor should measure conditions representative of the controlled space rather than conditions directly beside one actuator.

---

# Humidity oscillates around the target

Some humidity variation is normal.

The response of a controlled environment depends on factors such as:

* enclosure volume,
* humidifier output,
* airflow,
* ventilation rate,
* sensor position,
* temperature.

MycoBox provides both fixed-cycle and adaptive humidification control.

If humidity changes too aggressively, review the humidification configuration and observe how the environment reacts after the humidifier switches off.

A strong humidifier in a small enclosure can continue increasing humidity after power has already been removed.

---

# Humidifier does not switch on

Check:

1. The Zigbee device is paired.
2. The correct device is assigned to **Humidifier**.
3. The correct endpoint is configured.
4. The outlet can be switched manually from the Zigbee page.
5. Humidification control is enabled.
6. The current conditions actually require humidification.

Always test the Zigbee outlet manually before troubleshooting the automatic control logic.

---

# Fan, light or heating does not switch

The same basic procedure applies to all Zigbee-controlled equipment.

Open:

**System → Zigbee**

Verify:

* the device is paired,
* the expected IEEE address is selected,
* the correct endpoint is configured,
* manual **ON** and **OFF** tests operate the intended equipment,
* the correct MycoBox function is bound.

Current bindings include:

* Humidifier,
* FAE / Fan,
* Light,
* Heatpad.

If manual switching works but automatic control does not, review the control configuration for that function.

---

# Zigbee device does not appear

Open:

**System → Zigbee**

Then:

1. Press **Open Zigbee Network**.
2. Put the Zigbee device into pairing mode.
3. Wait for pairing.
4. Press **Refresh paired devices**.

The MycoBox pairing window remains open for:

```text
120 seconds
```

If the device still does not appear:

* move it closer to MycoBox,
* factory-reset the Zigbee device,
* reopen the Zigbee network,
* try pairing again.

The exact pairing or reset procedure depends on the Zigbee device manufacturer.

---

# Zigbee device appears but cannot be controlled

The current MycoBox interface supports switch-type Zigbee devices.

First test:

```text
Endpoint 1
```

which is commonly used by simple smart plugs.

For multi-outlet devices, individual outlets may use different endpoints.

Test available endpoints one by one.

The current Zigbee switch controller actively handles endpoints:

```text
1 through 6
```

If no supported endpoint operates the device, the Zigbee implementation used by that device may not currently be compatible with MycoBox.

---

# A multi-outlet Zigbee device controls the wrong outlet

Endpoint numbers are determined by the Zigbee device manufacturer.

Do not assume that:

```text
Endpoint 1 = Outlet 1
Endpoint 2 = Outlet 2
```

Use manual ON/OFF tests to identify each physical outlet.

Then save the correct endpoint in the appropriate MycoBox binding.

---

# Zigbee quick test controls the wrong endpoint

The quick ON/OFF controls in the paired-device list currently test:

```text
Endpoint 1
```

To test another endpoint, use the test controls inside the appropriate binding section.

---

# A Zigbee device disappeared after an H2 firmware update

Updating the ESP32-H2 Zigbee Controller requires the Zigbee network to be rebuilt.

After an H2 update:

1. Open the Zigbee network.
2. Pair the devices again.
3. Refresh the paired-device list.
4. Verify each endpoint.
5. Review all bindings.
6. Test every actuator manually.

See:

[Zigbee Setup](zigbee.md)

---

# Forget paired devices was used accidentally

The **Forget paired devices** operation resets the Zigbee network maintained by the ESP32-H2.

Previously paired devices must then be paired again.

This is different from removing a single binding.

After a Zigbee network reset:

1. Pair the required devices again.
2. Identify their endpoints.
3. Recheck MycoBox bindings.
4. Test all connected equipment.

---

# Main Controller firmware update failed

If an ESP32-S3 firmware update reports an error:

1. Do not repeatedly power-cycle the controller.
2. Read the error shown in the web interface.
3. Verify that the selected file is the correct MycoBox S3 OTA package.
4. Check that the downloaded file is complete.
5. Retry the update using a stable network connection.

A failed upload does not necessarily mean that recovery is required.

The S3 updater writes the new firmware to the inactive OTA partition and validates the package before selecting it for the next boot.

If the controller still starts normally, use the existing firmware and retry the update.

See:

[Firmware Updates](firmware-update.md)

---

# Zigbee Controller firmware update failed

The ESP32-H2 update rewrites the Zigbee Controller firmware.

If the update fails:

* do not repeatedly interrupt power,
* check the error displayed by MycoBox,
* verify that the selected file is the correct H2 firmware,
* verify that the file size is exactly 2 MiB.

An interrupted H2 update may require firmware recovery.

Normal recovery images and production tooling are not distributed as standard public firmware assets.

---

# Firmware file is rejected

Make sure the correct firmware file is being used for the correct controller.

For the Main Controller use a file such as:

```text
MycoBox-S3-OTA-vX.XXX.EN.bin
```

For the Zigbee Controller use:

```text
MycoBox-H2-vX.XXX.EN.bin
```

Do not interchange the two files.

Do not use development firmware or recovery images through the normal web updater.

---

# The controller restarted during normal use

A restart can temporarily interrupt:

* web access,
* Zigbee control,
* environmental automation.

After the restart:

1. Wait for MycoBox to become available.
2. Check sensor values.
3. Check Zigbee Controller status.
4. Confirm that important actuator bindings are still present.
5. Observe the system before returning it to unattended operation.

If unexpected restarts repeat, review the controller logs and power supply stability.

---

# The displayed time is incorrect

Open:

**System → Time & Localization**

Check:

* timezone,
* time settings,
* whether network time synchronization is configured as expected.

MycoBox can use NTP when network time is available and a DS3231 RTC as an offline fallback.

Incorrect time can affect:

* schedules,
* environmental profiles,
* historical data,
* day transitions.

Correct the time before relying on time-based automation.

---

# A schedule activates at the wrong time

Verify:

1. Controller local time.
2. Configured timezone.
3. The schedule itself.
4. Any time-dependent environmental profile.

A correct schedule with an incorrect system timezone will still operate at the wrong local time.

---

# Configuration changes appear to have no effect

After saving a setting:

1. Verify that the web interface confirms the change.
2. Reload the relevant page.
3. Confirm that the stored value is shown correctly.
4. Check whether the function is currently enabled.
5. Check whether another automatic mode is controlling the same function.

For actuator-related settings, also verify the Zigbee binding.

---

# MycoBox cannot control equipment after configuration changes

Check the control path in this order:

```text
Sensor / schedule
        ↓
MycoBox control logic
        ↓
Zigbee binding
        ↓
Device endpoint
        ↓
Smart plug / relay
        ↓
Connected equipment
```

Manual testing from the Zigbee page is useful for separating control-logic problems from device or endpoint problems.

If the outlet cannot be controlled manually, troubleshoot Zigbee first.

---

# Factory reset

A factory reset clears the stored Main Controller configuration.

Use it only when normal configuration recovery is not possible.

To perform the current factory-reset procedure:

1. Power off or restart MycoBox.
2. Hold the **BOOT** button during startup.
3. Continue holding it during the approximately 7-second startup reset window.
4. MycoBox erases its stored configuration and restarts.

After a factory reset, settings such as network configuration and authorization return to their defaults.

The controller will need to be configured again.

---

# After a factory reset

Expect to repeat the initial setup:

1. Connect to:

```text
<controller-name>_AP
```

2. Use the default AP password:

```text
12345678
```

3. Log in with:

```text
Username: admin
Password: admin
```

4. Configure Wi-Fi.
5. Configure time and localization.
6. Verify sensors.
7. Review Zigbee configuration.
8. Reconfigure environmental control.

See:

[Getting Started](getting-started.md)

---

# Before leaving the system unattended

After troubleshooting or changing configuration, verify:

* sensors report reasonable values,
* all required Zigbee devices are available,
* each actuator controls the intended equipment,
* heating equipment operates safely,
* humidification behaves as expected,
* schedules use the correct local time.

Observe the controlled environment before relying on fully unattended operation.

---

# Still having problems?

When diagnosing a problem, collect the following information:

* MycoBox firmware version,
* Zigbee Controller firmware version,
* problem description,
* whether the problem is reproducible,
* which sensor or Zigbee device is involved,
* relevant controller logs,
* what changed immediately before the problem appeared.

Avoid posting:

* passwords,
* Wi-Fi credentials,
* private network information,
* encryption material,
* provisioning files.

When reporting a problem, include only the information required to reproduce the issue.

---

## Related documentation

* [Getting Started](getting-started.md)
* [Hardware Overview](hardware-overview.md)
* [Zigbee Setup](zigbee.md)
* [Firmware Updates](firmware-update.md)
