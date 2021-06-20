import * as Notifications from "expo-notifications"
import { Linking } from "react-native"
import { WATER_REMINDER_LINK } from "./utils/NotificationUtils"


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