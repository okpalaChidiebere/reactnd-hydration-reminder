import AsyncStorage from "@react-native-async-storage/async-storage"

const HYDRATION_APP_STORAGE_KEY = "HydrationApp:PreferenceManager"
export const KEY_WATER_COUNT = "water-count"
export const KEY_CHARGING_REMINDER_COUNT = "charging-reminder-count"

const  DEFAULT_COUNT = 0

async function getDefaultSharedPreferences(prefKey){
    const prefs = await AsyncStorage.getItem(HYDRATION_APP_STORAGE_KEY)

    if(!prefs)
        return DEFAULT_COUNT //early return

    return JSON.parse(prefs)[prefKey] ? JSON.parse(prefs)[prefKey] : DEFAULT_COUNT
}

export async function getWaterCount() {
    return await getDefaultSharedPreferences(KEY_WATER_COUNT)
}

export async function getChargingReminderCount() {
    return await getDefaultSharedPreferences(KEY_CHARGING_REMINDER_COUNT)
}

export function setWaterCount(glassesOfWater) {
    return AsyncStorage.mergeItem(HYDRATION_APP_STORAGE_KEY, JSON.stringify({
        [KEY_WATER_COUNT]: glassesOfWater
    }))
}

export async function incrementWaterCount() {
    let waterCount = await getWaterCount()
    setWaterCount(++waterCount)
}