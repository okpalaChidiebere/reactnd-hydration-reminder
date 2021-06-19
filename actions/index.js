import { incrementWaterCount }  from "../utils/PreferenceUtilities"

export const RECEIVE_PREFERENCES = "RECEIVE_PREFERENCES" //receive datas from our PreferenceUtilities (AsyncStorage)
export const INCREMENT_WATER_COUNT = "INCREMENT_WATER_COUNT"
export const DECREMENT_WATER_COUNT = "DECREMENT_WATER_COUNT"


export function receivePreferences(preferences) {
  return {
    type: RECEIVE_PREFERENCES,
    preferences,
  }
}

function incrementWaterCountPref(key) {
  return {
    type: INCREMENT_WATER_COUNT,
    key,
  }
}

function decrementWaterCountPref(key) {
  return {
    type: DECREMENT_WATER_COUNT,
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
    dispatch(incrementWaterCountPref(key))
    incrementWaterCount() //NOTE: the function that performs assumed long running task must be asycnhronous (keyword "async")

  }catch(e){
    dispatch(decrementWaterCountPref(key))
    alert('An error occurred. Try again.')
    console.log(e)
  }
}