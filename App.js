import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { FONTS } from './constants/fonts';
import { useCallback } from 'react';
import { Onboarding, SplashScreenC,Login, Signup, Welcome, HomScreen, 
  Training, GraphTab, Chat, Profile, DataMonitor, EditProfile, Insight, CalibrationScreen, TestScreen, Sprinting, DetailScreen, MuscleGroup } from './screens';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabNavigation from './navigation/BottomTabNavigation'

SplashScreen.preventAutoHideAsync()

const Stack = createNativeStackNavigator()

export default function App() {
  const [fontsLoaded] = useFonts(FONTS);

  const onLayoutRootView = useCallback(async ()=>{
    if(fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
      return null
  }

  return (
      
    <Provider store={store}>
   <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreenC"
        screenOptions={{ headerShown: false }}
      ><Stack.Screen name="SplashScreenC" component={SplashScreenC} />
      <Stack.Screen name="Onboarding" component={Onboarding}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation}/>
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="Home" component={HomScreen}/>
        <Stack.Screen name="Training" component={Training}/>
        <Stack.Screen name="Chat" component={Chat}/>
        <Stack.Screen name="EditProfile" component={EditProfile}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="CalibrationScreen" component={CalibrationScreen}/>
        <Stack.Screen name="Insight" component={Insight}/>
        <Stack.Screen name="Sprinting" component={Sprinting}/>
        <Stack.Screen name="DataMonitor" component={DataMonitor}/>
        <Stack.Screen name="DetailScreen" component={DetailScreen}/>
        <Stack.Screen name="TestScreen" component={TestScreen}/>
        <Stack.Screen name="MuscleGroup" component={MuscleGroup}/>
        <Stack.Screen name="GraphTab" component={GraphTab}/>
        </Stack.Navigator>
  
      </NavigationContainer>
  </SafeAreaProvider>
  </Provider>
  );
}

