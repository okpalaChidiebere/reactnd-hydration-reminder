export const RECEIVE_PREFERENCES = "RECEIVE_PREFERENCES" //receive datas from our PreferenceUtilities (AsyncStorage)

export function receivePreferences(preferences) {
  return {
    type: RECEIVE_PREFERENCES,
    preferences,
  }
}
