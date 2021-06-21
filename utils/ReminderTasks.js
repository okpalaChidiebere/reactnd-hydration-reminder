import { clearAllNotifications, ACTION_DISMISS_NOTIFICATION, ACTION_INCREMENT_WATER_COUNT, 
    remindUserBecauseCharging } from "./NotificationUtils"
import store from "../store/configureStore"
import { KEY_WATER_COUNT, KEY_CHARGING_REMINDER_COUNT } from "../utils/PreferenceUtilities"
import { handleSavePreferences } from "../actions"


export const ACTION_CHARGING_REMINDER = "charging-reminder"

export async function executeTask(action) {
    if (ACTION_INCREMENT_WATER_COUNT === action) {
        incrementWaterCountHelper()
    } else if (ACTION_DISMISS_NOTIFICATION === action) { //If the user ignored the reminder, clear the notification
        clearAllNotifications()
    } else if (ACTION_CHARGING_REMINDER === action) {
        issueChargingReminder()
    }
}

async function incrementWaterCountHelper() {
    store.dispatch(handleSavePreferences(KEY_WATER_COUNT)) //We intentionally did not "await" the store update. This is because we could make long running fetch request or database actions that we dont want to have to wait for that to clear the notification
    
    // If the water count was incremented, clear any notifications
    await clearAllNotifications()
}

async function issueChargingReminder() {
    store.dispatch(handleSavePreferences(KEY_CHARGING_REMINDER_COUNT))
    await remindUserBecauseCharging()
}