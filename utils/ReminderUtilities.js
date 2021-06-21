import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import * as Battery from "expo-battery"
import { executeTask, ACTION_CHARGING_REMINDER } from "./ReminderTasks"

const REMINDER_INTERVAL_MINUTES = 15
//https://www.tutsmake.com/javascript-convert-hours-to-minutesminutes-to-secondsdate-to-milliseconds/
const REMINDER_INTERVAL_SECONDS = Math.floor(REMINDER_INTERVAL_MINUTES * 60)
const REMINDER_JOB_TAG = "hydration_reminder_tag"


TaskManager.defineTask(REMINDER_JOB_TAG, async () => {
    const state = await Battery.getBatteryStateAsync()

    //check this link to see platform compatibility https://docs.expo.io/versions/v41.0.0/sdk/battery/ 
    if(state === Battery.BatteryState.CHARGING){
        await executeTask(ACTION_CHARGING_REMINDER)
    }

    //console.log(REMINDER_JOB_TAG, "running")
    return BackgroundFetch.Result.NewData;
})
  
export async function scheduleChargingReminder(){

    //await BackgroundFetch.unregisterTaskAsync(REMINDER_JOB_TAG)  // debugging purpose
    //await TaskManager.unregisterAllTasksAsync() // debugging purpose.

    const isRegistered = await TaskManager.isTaskRegisteredAsync(REMINDER_JOB_TAG)
    
    if(isRegistered)
        return
    
    await BackgroundFetch.registerTaskAsync(REMINDER_JOB_TAG, {
        minimumInterval: REMINDER_INTERVAL_SECONDS,
        stopOnTerminate: false,
        startOnBoot: true,
    })
    await BackgroundFetch.setMinimumIntervalAsync(REMINDER_INTERVAL_SECONDS)

}