# Zigbee Setup

Open **Zigbee** from the main navigation to pair a device, identify its outputs and assign them to automation.

MycoBox supports **one paired ON/OFF switch or power strip**. A device with several independent outputs can control several functions; a single-output plug can serve one function. Four separate plugs cannot be paired together.

![Zigbee page with the paired device, four assignments and output test controls](../media/web-ui/zigbee-settings.png)

## Currently supported devices

Use a compatible switch-type Zigbee device, such as a smart plug or power strip with independently switched outputs. Zigbee environmental sensors are not supported; MycoBox takes environmental measurements from its connected sensor.

MycoBox discovers the device's supported ON/OFF outputs. It can handle up to **32 outputs**, with endpoint numbers **1–240**. Numbers may be nonconsecutive. The interface offers only detected outputs; this does not imply compatibility with every Zigbee product.

See [Compatibility](compatibility.md) for the supported device class and hardware guidance.

## Pairing a new Zigbee device

1. Open **Zigbee** and wait for **Zigbee controller available**.
2. Select **Start pairing**. The pairing window opens for 120 seconds.
3. Put the switch or power strip into pairing mode using its manufacturer's instructions.
4. Wait for the pairing result and output discovery. After successful pairing, the window closes automatically.
5. Select **Refresh** if you need to read the device again. Expand **Device information** to see its address and discovered output numbers.

Use **Cancel pairing** to close an open window early. Follow any message about an incompatible device or failed discovery before trying again. An output-discovery failure is different from a device being identified as unsupported.

If a device is already paired, MycoBox does not accept a second one. To replace it, use the [network reset procedure](#forgetting-all-zigbee-devices), then pair its replacement.

## Understanding endpoints

An endpoint identifies an output on the paired device. **Output 3** in MycoBox need not be the socket marked “3” on a power strip. There is no universal numbering scheme.

Use the detected **Output** choices and test each one to identify the physical socket. Do not guess endpoint numbers or assume that output 1 is always the right choice.

<a id="current-endpoint-support"></a>
The available choices come from discovery, including nonconsecutive numbers. An output missing from that list cannot be selected for normal control or an assignment.

## Testing a device

Under **Test output**:

1. Select a discovered **Output**.
2. Check which equipment is connected and that it is safe to switch.
3. Select **Turn ON** and wait for confirmation. Check the actual equipment.
4. Select **Turn OFF**, wait for confirmation and check that the equipment stopped.
5. Repeat for the other outputs you intend to use.

The test controls act on the selected output, not a fixed endpoint. A successful result confirms that particular command. **Last test** is not a continuous reading, and automation may change an assigned output again after the test.

After a network reset, **Turn ON** is disabled until a new assignment is saved. During an incomplete H2 application update, ON remains blocked until update verification completes; do not change assignments to release that pause. See [Restoring assignments after maintenance](#restoring-assignments-after-maintenance) and [Firmware Updates](firmware-update.md#updating-the-zigbee-controller).

If a test is not confirmed, investigate the device and communication before assigning the output. If its result is unknown after a connection interruption, check the equipment; an OFF command can be sent again. See [Troubleshooting](troubleshooting.md#zigbee-device-appears-but-cannot-be-controlled).

## Binding devices to MycoBox functions

The **Assignments** section contains four roles:

| Role | Equipment |
| --- | --- |
| **Humidifier** | Humidification |
| **Fan** | Ventilation |
| **Light** | Lighting |
| **Heat** | Heating equipment |

Each role uses a **different output on the same paired device**. An output already assigned to one role cannot also serve another. Pairing establishes communication; an assignment tells MycoBox what an output controls.

### Creating a binding

1. Identify the physical outputs using **Test output**, finishing each test with confirmed OFF.
2. Check the intended growing mode and schedule under **Cycle & automation**.
3. In the required role's **Assigned output** list, select the appropriate detected output.
4. Select that role's **Save** button and wait for success.
5. Check that the role shows **Saved** and the intended **Saved: output …** value.

When changing an assignment, MycoBox must confirm the previous output OFF and establish OFF on the new output before saving. An unconfirmed OFF blocks the change. A saved assignment becomes available to automation, which may then switch it according to the selected mode and cycle.

Assignment saves are separate from **Save cycle**. Save each role individually.

### Removing a binding

Select **Not assigned** in the role's **Assigned output** list, then select **Save**. Removing an existing assignment also requires its old output to confirm OFF. The device stays paired.

If an old output is unreachable, restore its communication before retrying the change. If the save result is unknown, use **Reload settings** to read the stored assignment before making another change.

## Restoring assignments after maintenance

After a Zigbee network reset or an older full-image H2 update that cleared assignments, pairing alone does not release maintenance. **Turn ON** remains disabled until the first new assignment is successfully saved.

Current H2 application OTA preserves pairing and assignments. Its update pause is released by verification of the firmware, saved device/outputs and confirmed OFF, not by saving a new assignment. If that update is pending, follow [Firmware Updates](firmware-update.md#if-an-h2-update-is-interrupted) instead of the steps below.

1. Keep the controlled loads independently isolated or use a harmless test load while restoring the mapping. Saving an assignment can allow automation to operate it immediately.
2. Check the paired-device status. If no device is paired, use **Start pairing** to pair the switch or power strip. Wait for its detected outputs to appear.
3. Under one intended role, choose an actual detected **Assigned output** and select **Save**. Use your recorded mapping where available. Saving unchanged **Not assigned** selections cannot release maintenance.
4. Once that save succeeds, use **Test output** to identify and check ON/OFF operation. Keep the other loads isolated while their mapping is uncertain; automation may act on saved roles during testing.
5. Finish or correct the remaining distinct assignments, saving each role and checking its stored output.
6. Restore the intended mode/schedule and verify the actual equipment under supervision before leaving it unattended.

## Using multi-outlet power strips

A compatible four-output strip can provide all four roles. For example:

| Detected output | Assigned role |
| --- | --- |
| Output 1 | Humidifier |
| Output 3 | Fan |
| Output 5 | Light |
| Output 8 | Heat |

These numbers are an example, not a required layout. Use only the outputs your device actually exposes and verify their physical sockets.

<a id="forgetting-all-zigbee-devices"></a>
## Resetting the Zigbee network

Open **Zigbee → Advanced → Reset Zigbee network** and select **Reset network** only when you intend to remove the paired device and rebuild its assignments.

Before resetting, MycoBox blocks new ON commands and attempts to confirm OFF for the outputs that need it, including relevant manual activity. If OFF cannot be confirmed, the reset is blocked. After preparation succeeds, assignments are cleared; a lost response does not justify assuming that nothing changed.

After a confirmed reset, wait for the Zigbee controller to become available, then follow [Restoring assignments after maintenance](#restoring-assignments-after-maintenance). Keep the loads safe, pair the device and save an initial intended assignment before ON tests; then finish and verify the remaining roles.

Maintenance blocks new ON commands until a new assignment is successfully saved. This pause survives a Main Controller restart. If the result is uncertain, select **Reload settings** and inspect the current state before another operation.

This is separate from removing one assignment or performing a [Main Controller factory reset](troubleshooting.md#factory-reset).

## Zigbee Controller firmware

The H2 firmware controls are under **Zigbee → Advanced → Zigbee Controller · ESP32-H2**. Use **Update Zigbee Controller** only with the correct release file.

Current H2 application OTA preserves the existing compatible Zigbee network, paired device and assignments. Install the required Main Controller update first, then use the release's **H2-OTA** package in **Zigbee Controller OTA package (.bin)**. Full recovery images are rejected by this form.

The updater closes pairing and confirms the necessary outputs OFF before programming. After the upload, automation waits for verification of the firmware, saved device/outputs and confirmed OFF. Keep MycoBox and the paired switch powered until verification completes. Check retained assignments and physical operation afterwards; normal application OTA does not require pairing again.

An interrupted update can be retried with the complete matching OTA package when valid preparation was saved, even if H2 no longer answers. While it is pending, ON, pairing, network reset and assignment changes stay blocked. Do not reset the network or erase settings to bypass verification.

Follow [Firmware Updates](firmware-update.md#updating-the-zigbee-controller) for the complete procedure.

## Troubleshooting Zigbee

If a device is absent, discovery fails, a test is not confirmed or an assignment cannot be saved, read the result shown on the page. **Technical details** may provide additional information for a problem report.

Check [Troubleshooting](troubleshooting.md) before resetting the network. When inspecting or servicing connected equipment, use an independent means of making it safe; a manual test does not prevent automation from acting later.

## Related documentation

[Getting Started](getting-started.md) · [Compatibility](compatibility.md) · [Firmware Updates](firmware-update.md) · [Troubleshooting](troubleshooting.md) · [Safety](safety.md)
