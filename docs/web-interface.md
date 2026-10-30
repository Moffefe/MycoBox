# Web interface

Open the controller's local address in a browser and sign in with your administrator account. The interface and its assets are stored on MycoBox and work without internet. For first access, see [Getting started](getting-started.md).

Screenshots in these guides use sample data; they illustrate the interface rather than a specific installation.

## Navigation

| Page | Main purpose |
| --- | --- |
| **Overview** | Current conditions, Growbox states, warnings, active cycle and assignments |
| **Measurements** | Temperature and humidity history, activity tracks and recorded readings |
| **Cycle & automation** | Growing mode, humidification mode, light schedule and daily time points |
| **Zigbee** | Pairing, output assignments, manual tests and Zigbee Controller maintenance |
| **Activity log** | Recorded events for Heat, Light, Fan and Humidifier |
| **Cluster** | Discovered controllers and group actions |
| **System** | Network, time, administrator account, backup and restore, and Main Controller updates |

**Diagnostics** is available from System and the page footer.

## Overview and Growbox

<p align="center">
  <img src="../media/web-ui/dashboard.png" alt="MycoBox Overview with the Growbox diagram, confirmed output states and current cycle" width="1000">
</p>

The Growbox diagram shows **Light**, **Fan**, **Humidifier**, **Heat** and the climate sensor. Select a device to open its associated settings; the sensor opens Measurements, while an unassigned output directs you to Zigbee.

- **ON / OFF · Confirmed** represents a recently confirmed output state.
- **Unknown** means a fresh state cannot currently be confirmed.
- **Not assigned** means the function has no usable output assignment.
- **Assignment conflict** means the assignments need correction in Zigbee before normal control can resume.
- **Paused · Maintenance** means Zigbee maintenance is blocking normal operation; follow the instructions on the Zigbee page.
- **Needs attention** highlights a condition that deserves inspection.

The diagram is a status view, not a physical measurement of airflow, mist or heat. Check the actual equipment when an output is confirmed ON but the expected environmental response is missing.

The Current cycle card shows the active day, effective heating thresholds, humidity target and scheduled light window. Automation settings show which modes are active. The light window is a schedule; it does not mean the light is currently ON.

### Warnings

Warnings are assessed on the controller, including when the browser is closed. Expand a warning beside a device to read the condition and suggested checks.

| Condition | Required observation |
| --- | --- |
| Temperature or humidity outside the monitoring band | 30 minutes |
| No usable measurements or sustained lack of response reported by Adaptive | 15 minutes |
| Return to normal | Five stable minutes |

Planned sensor heating/cooling, maintenance and measurement gaps pause the relevant assessment. **Assessment paused** or **Previously observed** means a warning is awaiting fresh evidence; it is not a new confirmation of the condition. Observations are held in memory and clear after restart. There is no retained alarm history or notification service.

Warnings indicate observed conditions, not a diagnosis of an empty reservoir or failed appliance. They do not replace independent equipment protection.

## Measurements

<p align="center">
  <img src="../media/web-ui/measurements.png" alt="A full day of MycoBox temperature and humidity readings with equipment activity tracks" width="1000">
</p>

The SHT41 supplies ambient temperature and relative-humidity samples every **five seconds**, except during measurement pauses. Current readings include their age. Missing or stale readings are not presented as fresh measurements.

Measurements shows up to **288 samples at five-minute intervals**, approximately a day of continuous operation. Open **Readings as text** to inspect the values as text. Charts may connect valid points across missing samples; this does not create additional measurements.

Use the chart points to inspect individual readings. Four activity tracks share the time axis:

| Track | What it records |
| --- | --- |
| **Humidifier** | Recorded humidifier output activity |
| **Fan** | Recorded ventilation output activity |
| **Heat** | Recorded heating output activity |
| **Sensor heater** | Sensor-heater commands and cooling information |

The **Events** control and category buttons change the displayed annotations, not the automation. Recorded output activity is based on commands and confirmations, rather than an independent measurement of equipment operation. Unknown or incomplete portions of history must not be treated as confirmed OFF periods.

Measurement and activity histories are held in memory and start again after a restart. A short history can also mean that the oldest records have been replaced in a bounded buffer.

### Sensor heating and cooling

**Sensor heater active** and **Sensor cooling after heating** are temporary sensor states. Fresh ambient readings are paused while the SHT41 heats and cools; the interface resumes them after a valid ambient measurement is available. These messages do not by themselves mean the sensor has failed.

The automatic heater policy uses a one-second pulse followed by three minutes of cooling. Normal heating requires a current reading above 90% RH and at least three hours since startup or the previous heater command. Sustained readings near saturation can show possible sensor wetting and allow a shorter, one-hour minimum interval while RH remains at least 99%. Possible wetting is an observation, not proof of condensation. These statuses do not add a manual heater control.

See [Troubleshooting](troubleshooting.md) if readings remain unavailable or a communication error persists.

## Cycle and automation

<p align="center">
  <img src="../media/web-ui/cultivation-cycle.png" alt="MycoBox growing modes, cycle save status and daily time points" width="1000">
</p>

A cycle contains up to **32 days**, each with up to **four time points**. The first point stays at **00:00**. The active point supplies that part of the day's temperature, fan and humidification settings. Days advance relative to the cycle start time; after the last configured day, the cycle repeats from Day 1.

### Choose the modes

| Setting | Behavior |
| --- | --- |
| **Fruiting** | Uses scheduled temperature and fan timing; the light follows its window when enabled |
| **Incubation** | Sets Fan and Light to OFF and uses the fixed heating range shown by the interface |
| **Timer** | Uses the configured humidifier ON/OFF periods |
| **Adaptive** | Uses humidity readings and the target to control humidification pulses |
| **Light schedule** | Enables or disables the daily light window |

Humidification keeps its selected mode when changing between Fruiting and Incubation. Timer mode does not regulate humidity to the Adaptive target.

In Fruiting, Heat turns ON below the active temperature target and OFF above target + 0.3 °C. Incubation uses 23.5–23.8 °C. Between thresholds, heating keeps its previous decision. Heat requests OFF if the temperature reading is unusable or below 5 °C; this is not frost protection or a guarantee of physical OFF.

Adaptive V1.4 learns the response of the humidifier and enclosure during operation. Adaptive starts are separated by at least **five minutes**, and a single run is limited to **120 seconds**; a required OFF is not delayed by the start interval. It stops an active pulse when usable ambient readings become unavailable. The first Adaptive run after restart also waits for at least five minutes of controller uptime. The learned response is held in memory and must be learned again after restart. Observe actual humidity and equipment response: the controller cannot guarantee a target band for every enclosure or actuator.

Mode changes are saved immediately. Schedule edits follow the separate save process below.

### Edit and save a schedule

1. Select a day under **Edit day**.
2. Use **Edit time point** or **Add time point** to set its start hour and environmental settings.
3. Choose **Apply changes** to apply the edited point. Closing or cancelling the form discards that form's edits.
4. Use **Edit light** to set the daily window. The ON hour must be earlier than the OFF hour.
5. Check the resulting schedule and choose **Save cycle**.

Applied schedule edits affect the running cycle in memory. **Save cycle** keeps them after a restart. Check that the save confirmation succeeds; an active but unsaved schedule is not a persistent backup.

**Duplicate day** copies the selected day, while **Add day** extends the cycle. The Advanced cycle actions include removing a day and **Restart cycle**. Restart cycle changes the cycle start time and keeps the schedule; save afterwards to retain the new start time.

If a write reports an unknown result, reload the configuration and inspect its actual state before making more changes. Repeating a state-changing action immediately can make the outcome harder to establish.

## Zigbee

Use the [Zigbee guide](zigbee.md) for pairing, output identification, assignments and network maintenance. For controller updates and post-update verification, use [Firmware updates](firmware-update.md).

## Activity log

Select **Heat**, **Light**, **Fan** or **Humidifier**. The page normally shows up to 50 recent events in that category; **Show up to 200 events** requests a longer available history.

Each entry includes its time, an event description and a message. Select the column headings to sort the loaded entries. Sorting does not fetch older events. Open **Technical details** for diagnostic codes and original event data.

For **State not confirmed** and similar messages, use the [Zigbee diagnostic checks](troubleshooting.md#zigbee-device-appears-but-cannot-be-controlled).

## Cluster

Cluster lists other discovered MycoBox controllers on the local Wi-Fi network. **Refresh discovery** updates the search. Each group action opens a confirmation showing the source controller, recipients and settings that will be replaced:

- **Copy settings…** replaces and saves the light-schedule enable setting, humidification mode and growing mode.
- **Copy cycle…** replaces, activates and saves the complete schedule and cycle start time. It includes active, unsaved schedule changes on the source.
- **Restart recipients…** restarts the listed remote controllers, losing their unsaved cycle changes.

The source controller is excluded from recipients. Recipients must use the same administrator login and password as the source. If the discovered list changes before confirmation, refresh and review it again; the command is rejected until the list matches. Once accepted, a command keeps its chosen recipients even if discovery later changes.

Review the node list and each growbox's equipment before confirming a group action. Copying a cycle does not copy Zigbee assignments. A group command can succeed on some recipients and fail on others. If the result is incomplete or unknown, inspect each recipient before retrying.

<a id="backup-and-restore"></a>

## System

Use the following guides for System operations. Save pending cycle edits before a setting change that restarts the controller.

| Section | Guide |
| --- | --- |
| **Network**, **Time**, **Account** and controller name | [Connection and initial settings](getting-started.md#3-log-in) |
| **Updates** | [Firmware files and update procedures](firmware-update.md) |
| **Backup & restore** | [Settings export, selected import and diagnostic ZIP](backup-restore.md) |
| **Diagnostics** | [Investigating a problem](troubleshooting.md) |

[Documentation](README.md) · [MycoBox overview](../README.md)
