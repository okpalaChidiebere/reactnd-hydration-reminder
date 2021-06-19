import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider as StoreProvider } from "react-redux"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { SafeAreaView } from "react-native-safe-area-context"
import MainComponent, { MainComponentOptions } from "./components/MainComponent"
import store from "./store/configureStore"


export default function App() {
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
    <NavigationContainer>
      <Stack.Navigator headerMode="screen" initialRouteName="MainComponent">
          <Stack.Screen
            name="MainComponent"
            component={MainComponent}
            options={MainComponentOptions}
          />
      </Stack.Navigator>
    </NavigationContainer>
  )