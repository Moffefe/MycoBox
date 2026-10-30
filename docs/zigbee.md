# Zigbee Setup

Use **Zigbee** to pair a switching device, identify its outputs and assign them to automation. MycoBox supports one paired outlet or multi-output strip; a separate output is needed for each function you use.

<a id="currently-supported-devices"></a>
Check [supported devices and output limits](compatibility.md#zigbee-actuator-compatibility) before choosing hardware. A product's Zigbee label alone does not establish compatibility.

![Zigbee page with assignments and output tests](../media/web-ui/zigbee-settings.png)

## Pairing a new Zigbee device

1. Wait for **Zigbee controller available**.
2. Select **Start pairing** to open a 120-second window.
3. Put the outlet or strip into pairing mode using its manufacturer's instructions.
4. Wait for pairing and output discovery. Successful pairing closes the window automatically.
5. Use **Refresh** to read the device again if needed. **Device information** shows its address and detected output numbers.

**Cancel pairing** closes the window early. A discovery error means the device could not be checked; an incompatible-device result means it exposed no supported outputs.

If another device is already paired, use the [network reset procedure](#resetting-the-zigbee-network) before replacing it.

## Understanding endpoints

An endpoint identifies an output on the paired device. **Output 3** need not be the socket labelled “3”; numbering can be nonconsecutive.

<a id="current-endpoint-support"></a>
The panel offers only discovered outputs. An output absent from that list cannot be tested or assigned. Identify physical sockets with the test procedure below instead of guessing their numbers.

## Testing a device

Under **Test output**:

1. Select a detected **Output** and check which equipment is connected.
2. Select **Turn ON**, wait for confirmation and check the equipment.
3. Select **Turn OFF**, wait for confirmation and check that it stopped.
4. Repeat for each output you intend to use.

Use harmless test loads where possible. **Last test** confirms one command, not continuous operation; automation may subsequently change an assigned output. If a response is lost, inspect the equipment; an OFF command can be sent again.

If **Turn ON** is disabled, check whether you need [assignment restoration after a reset](#restoring-assignments-after-maintenance) or [completion of an H2 update](firmware-update.md#updating-the-zigbee-controller).

## Binding devices to MycoBox functions

Pairing establishes communication; assignments connect outputs to the **Humidifier**, **Fan**, **Light** and **Heat** roles.

Every assigned role must use a different output on the same paired device. Unused roles can remain **Not assigned**.

### Creating a binding

1. Identify the output with [Test output](#testing-a-device), finishing with confirmed OFF.
2. Review the intended [growing mode and schedule](web-interface.md#cycle-and-automation).
3. Choose its **Assigned output**, select the role's **Save** button and wait for success.
4. Check **Saved** and **Saved: output …**.

Changing an assignment requires confirmed OFF on both its previous and new outputs. An unconfirmed OFF blocks the save. Once saved, automation may operate that role immediately.

Save each role separately; these saves are independent of **Save cycle**.

### Removing a binding

Choose **Not assigned** and select the role's **Save** button. Its old output must confirm OFF; the device remains paired.

If an old output is unreachable, restore communication before retrying a change or removal. If the result is unknown, use **Reload settings** to read the stored assignment before another attempt.

<a id="forgetting-all-zigbee-devices"></a>
## Resetting the Zigbee network

Use **Zigbee → Advanced → Reset Zigbee network → Reset network** only to remove the paired device and rebuild its assignments.

MycoBox blocks new ON commands and confirms OFF on affected outputs, including relevant manual activity. Failure to confirm OFF blocks the reset. Successful preparation clears assignments; an uncertain response does not mean nothing changed. Use **Reload settings** to inspect the result before another operation.

After a confirmed reset, wait for the controller to become available and follow [Restoring assignments after maintenance](#restoring-assignments-after-maintenance). This pause survives an S3 restart.

A network reset is separate from removing one assignment or performing a [Main Controller factory reset](getting-started.md#factory-reset).

## Restoring assignments after maintenance

Use this sequence after a network reset or an older full-image update that cleared assignments. Pairing alone does not release this pause: the first new assignment must save successfully.

For a pending current H2 update, use the [H2 completion and retry procedure](firmware-update.md#if-an-h2-update-is-interrupted) instead.

1. Isolate controlled loads independently or use harmless test loads. The first successful assignment save can resume automation immediately.
2. Check the paired device. If none is present, follow [Pairing a new device](#pairing-a-new-zigbee-device) and wait for discovered outputs.
3. Select an actual detected output for one intended role and **Save**, using your recorded mapping if available. Unchanged **Not assigned** choices cannot release the pause.
4. After success, use [Test output](#testing-a-device) to identify/check sockets, keeping other loads isolated while their mapping is uncertain.
5. Complete or correct the distinct assignments, then check the [installation before unattended use](safety.md#before-leaving-the-system-unattended).

## Using multi-outlet power strips

A four-output strip can serve all four roles. For example:

| Detected output | Role |
| --- | --- |
| Output 1 | Humidifier |
| Output 3 | Fan |
| Output 5 | Light |
| Output 8 | Heat |

This is an example mapping, not a required layout. Use your device's detected outputs and the physical sockets identified in testing.

<a id="zigbee-controller-firmware"></a>
<a id="troubleshooting-zigbee"></a>
## Updates and problem reports

The H2 updater is under **Advanced → Zigbee Controller · ESP32-H2**. Current application OTA preserves compatible pairing and assignments; follow [Firmware Updates](firmware-update.md#updating-the-zigbee-controller) for files, preparation, verification and retry.

For failed discovery, unconfirmed tests or rejected assignment saves, read the page's result and **Technical details** before resetting anything. Use the [Zigbee diagnostics](troubleshooting.md#zigbee-device-appears-but-cannot-be-controlled) to investigate.

<a id="related-documentation"></a>
[Documentation](README.md) · [Compatibility](compatibility.md) · [Safety](safety.md)
