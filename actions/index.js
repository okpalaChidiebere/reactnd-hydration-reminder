import { incrementWaterCount, incrementChargingReminderCount, KEY_CHARGING_REMINDER_COUNT, KEY_WATER_COUNT }  from "../utils/PreferenceUtilities"

export const RECEIVE_PREFERENCES = "RECEIVE_PREFERENCES" //receive datas from our PreferenceUtilities (AsyncStorage)
export const INCREMENT_PERF_COUNT = "INCREMENT_PERF_COUNT"
export const DECREMENT_PERF_COUNT = "DECREMENT_PERF_COUNT"


export function receivePreferences(preferences) {
  return {
    type: RECEIVE_PREFERENCES,
    preferences,
  }
}

function incrementPrefByKey(key) {
  return {
    type: INCREMENT_PERF_COUNT,
    key,
  }
}

function decrementPrefByKey(key) {
  return {
    type: DECREMENT_PERF_COUNT,
    key,
  }
}

export const handleSavePreferences = (key) => async (dispatch) => {

  /**
   * We perform Optimistic Updates logic below
   * 
   * The reason we do not want to wait for the server is because sometimes 
   * there might be a delay. You dont want the delay to reflect in your UI 
  */
  try{
    dispatch(incrementPrefByKey(key))
    if(KEY_WATER_COUNT === key){
      incrementWaterCount() //NOTE: the function that performs assumed long running task must be asycnhronous (keyword "async")
    }else if(KEY_CHARGING_REMINDER_COUNT === key){
      incrementChargingReminderCount()
    }

  }catch(e){
    dispatch(decrementPrefByKey(key))
    alert('An error occurred. Try again.')
    console.log(e)
  }
}