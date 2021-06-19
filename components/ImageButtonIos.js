import React from "react"
import { TouchableOpacity, Text, View, ImageBackground }  from "react-native"

export default function ImageButtonIos({ prefValue, onIncrement }) {
    return (
        <TouchableOpacity onPress={onIncrement}>
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <ImageBackground
                    style={{width: 350, height: 350}}
                    source={require("../assets/ic_local_drink_grey_120px_3x.png")}
                >
                    <View style={{position: 'absolute', top: 150, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 40}}>{prefValue}</Text>
                </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    )
}
