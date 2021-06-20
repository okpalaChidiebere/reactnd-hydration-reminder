import * as Notifications from "expo-notifications"
import { Linking } from "react-native"
import { WATER_REMINDER_LINK } from "./utils/NotificationUtils"
import { executeTask } from "./utils/ReminderTasks"


import { main_component_stack } from "./utils/strings"

const config = {
  screens: {
    [main_component_stack]: WATER_REMINDER_LINK,
  },
}

function subscribe(listener) {

  const onReceiveURL = ({ url }) => listener(url)

    // Listen to incoming links from deep linking
  Linking.addEventListener('url', onReceiveURL)

  //We listen for push or local notifications
  const subscription = Notifications.addNotificationResponseReceivedListener(response => {

    const action = response.actionIdentifier //we get the particular action button clicked

    /** 
     * FYI: if we have a fetch request to be performed here when an action is made, 
     * those fetch request will be on pause until your app come becomes active then 
     * those tasks will be executed first before your component loads
     *  */
    executeTask(action)

  const url = response.notification.request.content.data.url //this url will as our pending intent to open a particular screen in our app

    // Let React Navigation handle the URL
    listener(url)
  });
  return () => {
    // Clean up the event listeners
    Linking.removeEventListener('url', onReceiveURL)
    subscription.remove();
  }
}

const linking = {
  prefixes: ["hydrationReminder://app"],
  config,
  subscribe,
}

export default linking;