# Zigbee Setup

Open **Zigbee** to connect a smart plug or strip and choose which socket controls each appliance. MycoBox supports **one paired switching device**, with a separate output for each function you use.

<a id="currently-supported-devices"></a>

Before choosing a device, check [compatibility](compatibility.md#zigbee-actuator-compatibility).

![Zigbee page with assignments and output tests](../media/web-ui/zigbee-settings.png)

## Pairing a new Zigbee device

1. Wait for **Zigbee controller available**.
2. Select **Start pairing**.
3. Within two minutes, put your plug or strip into pairing mode using its instructions.
4. Wait for MycoBox to find the device and its outputs. Pairing closes automatically when it succeeds.
5. Open **Device information** to see the detected outputs. Use **Refresh** if needed.

Choose **Cancel pairing** to stop early. If pairing fails, use [Troubleshooting](troubleshooting.md#zigbee-device-does-not-appear).

To replace an already paired device, [reset the Zigbee network](#resetting-the-zigbee-network) first.

## Understanding endpoints

An **endpoint** is the number MycoBox uses for a switchable output. The panel calls it **Output**.

These numbers may skip values or differ from the socket labels. For example, **Output 3** might switch a socket labelled “2”.

<a id="current-endpoint-support"></a>

Use the detected output list and test each socket before assigning it.

## Testing a device

Use a small lamp or another simple test load to identify sockets. Under **Test output**:

1. Select an **Output**.
2. Choose **Turn ON**, wait for confirmation and check which socket switched on.
3. Choose **Turn OFF** and check that it stopped.
4. Write down the mapping and repeat for the other outputs.

**Last test** shows the result of your last command. Automation can change an assigned output afterwards. If OFF is not confirmed, check the appliance and send OFF again.

If **Turn ON** is disabled, check for [a reset awaiting assignment restoration](#restoring-assignments-after-maintenance) or [an unfinished H2 update](firmware-update.md#if-an-h2-update-is-interrupted).

## Binding devices to MycoBox functions

Assign outputs to **Humidifier**, **Fan**, **Light** and **Heat**. Each role needs a different output. Leave unused roles as **Not assigned**.

### Creating a binding

1. [Identify the socket](#testing-a-device) and finish the test with it OFF.
2. Check your [growing mode and schedule](web-interface.md#cycle-and-automation).
3. Select the role's **Assigned output**, then choose its **Save** button.
4. Wait for **Saved** and **Saved: output …**.

Save each role separately. MycoBox needs OFF confirmation from the old and new outputs before changing an assignment. Once saved, the role can start working immediately.

### Removing a binding

Choose **Not assigned**, then the role's **Save** button. MycoBox turns its old output OFF; the switch stays paired.

If the old output cannot be reached, restore its power or connection and retry. For an unknown result, choose **Reload settings** before saving again.

<a id="forgetting-all-zigbee-devices"></a>

## Resetting the Zigbee network

A network reset removes the paired device and clears its assignments. Use it when replacing the switch or starting pairing again.

1. Open **Zigbee → Advanced → Reset Zigbee network**.
2. Choose **Reset network**.
3. Wait while MycoBox turns affected outputs OFF and resets the network.
4. Follow [Restoring assignments after maintenance](#restoring-assignments-after-maintenance).

If an output does not confirm OFF, restore its connection before retrying. If the result is unknown, use **Reload settings** to check what changed.

Automation stays paused until an assignment is restored, even after a restart. To remove just one role, use [Removing a binding](#removing-a-binding) instead. A [Main Controller factory reset](getting-started.md#factory-reset) is a separate operation.

## Restoring assignments after maintenance

After a network reset or an older full-image update that cleared assignments, the first successful assignment save releases the maintenance pause. **Manual ON tests become available after that save.**

1. Disconnect controlled appliances from the sockets, or use simple test loads. Saving the first assignment can start automation.
2. Check whether the switch is paired. If not, [pair it](#pairing-a-new-zigbee-device) and wait for its outputs.
3. Choose a detected output for one role and **Save**. Use your recorded socket mapping if you have one; leaving every role **Not assigned** keeps the pause active.
4. [Test the sockets](#testing-a-device) and correct that first assignment if needed.
5. Assign the remaining roles, reconnect the appliances to the matching sockets and [check operation](safety.md#before-leaving-the-system-unattended).

For an unfinished current H2 update, use the [update completion steps](firmware-update.md#if-an-h2-update-is-interrupted) instead.

## Using multi-outlet power strips

One strip with four independent outputs can handle all four roles. For example:

| Detected output | Role |
| --- | --- |
| Output 1 | Humidifier |
| Output 3 | Fan |
| Output 5 | Light |
| Output 8 | Heat |

Use the numbers you found when testing your own strip.

<a id="zigbee-controller-firmware"></a>
<a id="troubleshooting-zigbee"></a>

## Updates and problem reports

For H2 firmware, open **Advanced → Zigbee Controller · ESP32-H2** and follow [Firmware updates](firmware-update.md#updating-the-zigbee-controller).

If pairing, tests or assignment saves fail, start with [Zigbee troubleshooting](troubleshooting.md#zigbee-device-appears-but-cannot-be-controlled). Keep the displayed error and **Technical details** to include if you ask for help.

<a id="related-documentation"></a>

[Documentation](README.md) · [Compatibility](compatibility.md) · [Safety](safety.md)
