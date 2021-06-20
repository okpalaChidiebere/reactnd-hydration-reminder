import * as Notifications from "expo-notifications"
import { Platform } from "react-native"
import { main_notification_channel_name, charging_reminder_notification_body, charging_reminder_notification_title } from "./strings"


const WATER_REMINDER_NOTIFICATION_ID = (1138).toString() //channel goup identifier
/**
 * This link id is used to uniquely reference the link to open the MainComponent page
 */
export const WATER_REMINDER_LINK = (3417).toString()
/**
 * This notification channel id is used to link notifications to this channel
 */
const WATER_REMINDER_NOTIFICATION_CHANNEL_ID = "reminder_notification_channel"

export const ACTION_INCREMENT_WATER_COUNT = "increment-water-count"
export const ACTION_DISMISS_NOTIFICATION = "dismiss-notification"

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true, //for sunshine, the app is running, so no need to show alert. You may want this one like football scores app does.
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
})

export async function remindUserBecauseCharging(){

    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('You have to enable push notification!')
        return;
    }

    //Since Android O, you not allowed to send a notification, without assigning it to a channel
    if (Platform.OS === 'android') {
        const channel = await Notifications.getNotificationChannelAsync(WATER_REMINDER_NOTIFICATION_CHANNEL_ID)

        //If the channel has not been configured, then we configure one!
        if(!channel){
            Notifications.setNotificationChannelAsync(WATER_REMINDER_NOTIFICATION_CHANNEL_ID, {
                name: main_notification_channel_name, //name of the channel
                importance: Notifications.AndroidImportance.HIGH, //this will force the notification to pop up on the deive using the "heades-up" display
            })
        }
    }

    const data = { url: "hydrationReminder://app/"+WATER_REMINDER_LINK }
    const notificationContent = BuildNotificationContent(WATER_REMINDER_NOTIFICATION_CHANNEL_ID, charging_reminder_notification_title, charging_reminder_notification_body, data)

    await Notifications.setNotificationCategoryAsync(WATER_REMINDER_NOTIFICATION_CHANNEL_ID, setNotificationActions())

    await Notifications.scheduleNotificationAsync(createNotificationRequest(WATER_REMINDER_NOTIFICATION_ID, notificationContent, null))

    return
}

/**
* This method will return a NotificatioRequest.
*
* @param identifier Unique Id that defines this notification. Helps you cancel this notification at a later time
* @param content The notification content
* @param trigger You can pass in a triggerDate to schedule the notification or null to send the notification right away
*
* @return The Notification request
https://docs.expo.io/versions/v41.0.0/sdk/notifications/#notificationrequest
*/
function createNotificationRequest (identifier, content, trigger) {
    return {
        identifier,
        content,
        trigger, //null will trigger this notification right away
    }
}


function BuildNotificationContent (categoryIdentifier, title, body, data) {
    //https://docs.expo.io/versions/v41.0.0/sdk/notifications/#notificationcontent
    return {
        categoryIdentifier, //This help you attach action(s) to your notification
        title,
        body,
        data,
        sound: 'default',
        ...Platform.select({
            android:{
                vibrate: true, //we want the app to vibrate. even when app is in background 
                color: "#3F51B5", //colorPrimary for the Hydration app
                autoDismiss: true, //this guarantees that the notification will go away when i click on it
                priority: Notifications.AndroidImportance.HIGH, //this guarantees "heads-up" notification for android version later than jelly bean
            },
        })
    }
}

function setNotificationActions(){
    return [
        ignoreReminderAction(),
        drinkWaterAction(),
    ]
}

/** Create an Action for the user to ignore the notification (and dismiss it) */
function ignoreReminderAction(){
    return {
        identifier: ACTION_DISMISS_NOTIFICATION,
        buttonTitle: "No, thanks.",
        options: {
            isAuthenticationRequired: true,
          ...Platform.select({ ios:{ isAuthenticationRequired: true, }}),
          opensAppToForeground: false, //we dont want our app to open
        },
    }
}

/** Create an Action for the user to tell us they've had a glass of water  */
function drinkWaterAction(){
    return {
        identifier: ACTION_INCREMENT_WATER_COUNT, 
        buttonTitle: "👍 I did it!",
        options: {
          ...Platform.select({ ios:{ isAuthenticationRequired: true, }}),
          opensAppToForeground: false, //we dont want our app to open
        },
    }
}

/** Dismiss any notifications that we have created with our hydration app */
export async function clearAllNotifications(){
    return await Notifications.dismissAllNotificationsAsync()
}