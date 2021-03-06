import React, { useEffect, useState, useRef } from "react"
import { Text, View, StyleSheet, Image, Platform }  from "react-native"
import { connect } from "react-redux"
import ImageButtonAndroid from "./ImageButtonAndroid"
import ImageButtonIos from "./ImageButtonIos"
import { getChargingReminderCount, getWaterCount, KEY_CHARGING_REMINDER_COUNT, KEY_WATER_COUNT } from "../utils/PreferenceUtilities"
import { receivePreferences, handleSavePreferences } from "../actions"
import * as Battery from "expo-battery"

function MainComponent ({ preferences, dispatch }) {

    const [ batteryState, setBatteryState ] = useState(null)
    const subscriptionRef = useRef();

    useEffect(() => {
        (async () => {
            try{
                const batteryState = await Battery.getBatteryStateAsync()
                setBatteryState(batteryState === Battery.BatteryState.CHARGING)

                const chargingReminders = await getChargingReminderCount()
                const glassesOfWater = await getWaterCount()

                const prefs = {
                    [KEY_WATER_COUNT]: glassesOfWater,
                    [KEY_CHARGING_REMINDER_COUNT]: chargingReminders,
                }
                
                dispatch(receivePreferences(prefs))
            }catch(e){
                console.warn("Error with preference storage", e)
            }
        })()


        subscriptionRef.current = Battery.addBatteryStateListener(({ batteryState }) => {
            setBatteryState(batteryState === Battery.BatteryState.CHARGING)
        })

        return () => {
            subscriptionRef.current && subscriptionRef.current.remove()
            subscriptionRef.current = null
        };
    }, [])

    return (
        <View style={styles.container}>
            <View style={{
                flex: 1,
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{width: 350, color:"#424242", marginLeft:70}}>Press the glass of water after you've hydrated</Text>
            </View>
            <View style={{
                flex: 1,
                flexGrow: 9,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {
                Platform.OS === "android"
                ? <ImageButtonAndroid prefValue={preferences[KEY_WATER_COUNT]} onIncrement={() => dispatch(handleSavePreferences(KEY_WATER_COUNT))}/>
                : <ImageButtonIos prefValue={preferences[KEY_WATER_COUNT]} onIncrement={() => dispatch(handleSavePreferences(KEY_WATER_COUNT))}/>
            }
            </View>
            <View style={{
                flex: 1,
                flexGrow: 2,
                flexDirection: "row",
                alignItems:"center",
            }}>
                <Image
                    style={{width: 70, height: 70}}
                    source={showCharging(batteryState)}
                />
                <Text style={{width: 350}}>{`Hydrate while charging reminder sent ${preferences[KEY_CHARGING_REMINDER_COUNT]} times`}</Text>
            </View>
        </View>
    )
}


const mapStateToProps = ( preferences ) => { 
    return {
        preferences 
    }
}

const connectedMainComponent = connect(mapStateToProps)
export default connectedMainComponent(MainComponent)


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
    },
});

export function MainComponentOptions({ route, navigation }) {

    return {
        title: "Hydration Reminder",
        headerTintColor: '#fff',
        headerStyle: { 
            backgroundColor: "#3F51B5",
        },
    }
}

function showCharging (isCharging){
    return isCharging 
    ? require("../assets/ic_power_pink_80px.png") 
    : require("../assets/ic_power_grey_80px.png")
}