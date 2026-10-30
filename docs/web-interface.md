# Web interface

Open MycoBox's local address in your browser and sign in. The panel works without internet. For your first connection, follow [Getting started](getting-started.md).

## Navigation

| Page | Use it to… |
| --- | --- |
| [**Overview**](#overview-and-growbox) | See current conditions, equipment states and the active cycle |
| [**Measurements**](#measurements) | Explore temperature, humidity and equipment activity |
| [**Cycle & automation**](#cycle-and-automation) | Set growing modes and the daily schedule |
| [**Zigbee**](#zigbee) | Pair a switch, test sockets and assign equipment |
| [**Activity log**](#activity-log) | Review recent equipment events |
| [**Cluster**](#cluster) | Manage several MycoBox controllers |
| [**System**](#system) | Change connection and account settings, back up or update MycoBox |

You can open **Diagnostics** from System or the page footer.

## Overview and Growbox

<p align="center">
  <img src="../media/web-ui/dashboard.png" alt="MycoBox Overview with the Growbox diagram, confirmed output states and current cycle" width="1000">
</p>

The Growbox diagram shows **Light**, **Fan**, **Humidifier**, **Heat** and the climate sensor. Select a device to open its settings. Select the sensor to open Measurements, or an unassigned output to set it up in Zigbee.

| Status | Meaning |
| --- | --- |
| **ON / OFF · Confirmed** | MycoBox recently confirmed the output's state |
| **Unknown** | MycoBox is waiting for a fresh confirmation |
| **Not assigned** | Choose an output for this function in Zigbee |
| **Assignment conflict** | Correct the assignments in Zigbee |
| **Paused · Maintenance** | Open Zigbee to finish the maintenance steps |
| **Needs attention** | Open the message for suggested checks |

If an output is ON but the appliance produces no airflow, mist or heat, check the appliance itself.

The **Current cycle** card shows the active day, heating thresholds, humidity target and light window. **Automation settings** shows the selected modes. Check the Light status for whether it is ON now; the light window shows its schedule.

### Warnings

Open a warning beside a device to see what MycoBox noticed and what to check. Monitoring continues when you close the browser.

| Condition | When a warning appears |
| --- | --- |
| Temperature or humidity outside the monitoring band | After 30 minutes |
| Missing readings or no sustained humidity response in Adaptive | After 15 minutes |
| Conditions return to normal | The warning clears after five stable minutes |

Sensor cooling, maintenance or missing data can pause an assessment. **Assessment paused** and **Previously observed** mean MycoBox is waiting for fresh readings.

Warnings and observations clear after a restart. They appear in the local panel; MycoBox does not send notifications.

## Measurements

<p align="center">
  <img src="../media/web-ui/measurements.png?v=163a1c18" alt="A full day of MycoBox temperature and humidity readings with equipment activity tracks" width="1000">
</p>

Temperature and humidity normally refresh every **five seconds**. Check the age beside a reading to see how recent it is.

The chart holds up to **288 readings**, spaced five minutes apart: about one day. Select a point to inspect it, or open **Readings as text**. Lines may join points across a gap; the text view shows which readings were recorded.

The **Humidifier**, **Fan**, **Heat** and **Sensor heater** tracks help you compare activity with changes in temperature and humidity. **Events** and the category buttons change what appears on the chart.

History starts again after a restart. As it fills, older records are replaced. To keep a copy, [export diagnostics](backup-restore.md#export-diagnostics) before restarting.

### Sensor heating and cooling

The SHT41 occasionally heats itself during prolonged high humidity. **Sensor heater active** is followed by **Sensor cooling after heating**, which normally lasts three minutes.

Ambient readings pause during this process and return afterwards. This is automatic and separate from the **Heat** output that warms your growing space.

If fresh readings do not return, follow [Missing sensor values](troubleshooting.md#sensor-values-are-missing).

## Cycle and automation

<p align="center">
  <img src="../media/web-ui/cultivation-cycle.png" alt="MycoBox growing modes, cycle save status and daily time points" width="1000">
</p>

Create up to **32 days**, each with up to **four time points**. The first point starts at **00:00**. Each point sets temperature, fan timing and humidification for that part of the day.

Days advance from the cycle start time. After the last day, the schedule repeats from Day 1.

### Choose the modes

| Setting | What it does |
| --- | --- |
| **Fruiting** | Uses scheduled temperature and fan timing, plus the light window when enabled |
| **Incubation** | Keeps Fan and Light OFF and uses a fixed heating range of 23.5–23.8 °C |
| **Timer** | Runs the humidifier for the chosen ON/OFF periods |
| **Adaptive** | Adjusts humidification pulses using humidity readings and your target |
| **Light schedule** | Enables or disables the daily light window |

Changing between Fruiting and Incubation keeps your chosen humidification mode. In Timer mode, the ON/OFF periods control humidity; the Adaptive target is unused.

In Fruiting, heating starts below the temperature target and stops above target + 0.3 °C. Between these thresholds, it keeps its previous state. With an unusable reading or a temperature below 5 °C, MycoBox requests heating OFF. Use separate frost protection if needed.

Adaptive learns how your humidifier and enclosure respond. It waits at least **five minutes** between starts, runs each pulse for no more than **120 seconds**, and stops a pulse if ambient readings become unavailable. After a restart, it waits five minutes before the first run and learns the response again.

Mode changes save immediately. Save schedule edits separately as described below.

### Edit and save a schedule

1. Select a day under **Edit day**.
2. Choose **Edit time point** or **Add time point**, then set the time and conditions.
3. Choose **Apply changes**. Cancelling the form discards its edits.
4. Use **Edit light** to set the daily light window, with the ON time earlier than the OFF time.
5. Review the schedule and choose **Save cycle**.

**Apply changes** updates the running schedule. **Save cycle** keeps it after a restart.

Use **Duplicate day** to copy a day, or **Add day** to extend the cycle. In Advanced cycle actions, you can remove a day or use **Restart cycle** to begin again with the same schedule. Save afterwards to keep the new start time.

If a save reports an unknown result, reload the configuration and check it before editing again.

## Zigbee

Follow [Zigbee setup](zigbee.md) to pair a switch, identify sockets and assign equipment. Use [Firmware updates](firmware-update.md) to update the Zigbee Controller.

## Activity log

Select **Heat**, **Light**, **Fan** or **Humidifier** to see recent events. The page shows up to 50 events; choose **Show up to 200 events** for more.

Each entry has a time, description and message. Select a column heading to sort the entries. **Technical details** provides extra information for troubleshooting.

For **State not confirmed**, start with [Zigbee connection checks](troubleshooting.md#zigbee-device-appears-but-cannot-be-controlled).

## Cluster

Use Cluster to find other MycoBox controllers on the same Wi-Fi network. Select **Refresh discovery** to update the list. Controllers receiving a group action must use the same administrator login and password as the source.

| Action | What it changes on the selected recipients |
| --- | --- |
| **Copy settings…** | Saves the growing mode, humidification mode and light-schedule setting |
| **Copy cycle…** | Saves and activates the complete schedule and cycle start time, including active unsaved edits from the source |
| **Restart recipients…** | Restarts the controllers; their unsaved cycle edits are lost |

Review the recipient list before confirming. The source controller stays unchanged. If the discovered list changes, refresh it and review the action again.

Cycle copying keeps each recipient's Zigbee assignments. Check that its equipment suits the copied schedule.

After a group action, check the result for each recipient. If only some completed it, inspect the others before retrying.

<a id="backup-and-restore"></a>

## System

Save pending cycle edits before a change that restarts MycoBox.

| I want to… | Guide |
| --- | --- |
| Change Wi-Fi, time, account or controller name | [Getting started](getting-started.md) |
| Install firmware | [Firmware updates](firmware-update.md) |
| Save or restore settings | [Backup and restore](backup-restore.md) |
| Investigate a problem | [Troubleshooting](troubleshooting.md) |

[Documentation](README.md) · [MycoBox overview](../README.md)
