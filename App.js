import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Provider as StoreProvider } from "react-redux"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { SafeAreaView } from "react-native-safe-area-context"
import MainComponent, { MainComponentOptions } from "./components/MainComponent"
import store from "./store/configureStore"
import { main_component_stack } from "./utils/strings"
import linking from "./linking"
import { scheduleChargingReminder } from "./utils/ReminderUtilities"


export default function App() {

  useEffect(() => {
    (async () => {
      
      scheduleChargingReminder()
    })()
  }, [])
  return (
    <StoreProvider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#303F9F"/>
        <MainNavigator />
      </SafeAreaView>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const Stack = createStackNavigator()
  const MainNavigator = () => (
    <NavigationContainer linking={linking}>
      <Stack.Navigator headerMode="screen" initialRouteName={main_component_stack}>
          <Stack.Screen
            name={main_component_stack}
            component={MainComponent}
            options={MainComponentOptions}
          />
      </Stack.Navigator>
    </NavigationContainer>
  )