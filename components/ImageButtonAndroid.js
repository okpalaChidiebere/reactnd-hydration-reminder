import React from "react"
import { Text, View, ImageBackground, TouchableNativeFeedback }  from "react-native"

export default function ImageButtonAndroid({ prefValue }) {
    return(
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#E0E0E0", true)} >
            <View style={{
            flex: 1,
            flexGrow: 9,
            alignItems: 'center',
            justifyContent: 'center',
            }}>
                <ImageBackground
                    style={{width: 350, height: 350}}
                    source={require("../assets/ic_local_drink_grey_120px_3x.png")}
                />
                <View style={{position: 'absolute', top: 150, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 40}}>{prefValue}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}
