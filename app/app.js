import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SignedInStackScreen, SignedOutStackScreen, TabStackScreen } from "./router";
import { observer } from "mobx-react";
import { createNativeStackNavigator, } from '@react-navigation/native-stack'
import {
  AppState, Platform, View,
} from 'react-native'
import { navigationRef, } from './router/NavigationService'
import { useEffect } from "react";
import { useStores } from "./store";

const App: () => Node = () => {
  const {
    authStore,
  } = useStores()


  // componentDidMount Before
  // useEffect(()=>{
  //
  // },[])

  const RootStack = createNativeStackNavigator()
  const Stack = createNativeStackNavigator()
  const Tab = createBottomTabNavigator();

  return (
    <View style={{ flex: 1, }}>
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator>
          {authStore.userSignedIn ?
            <Stack.Screen
              name="SignedInStackScreen"
              component={SignedInStackScreen}
              options={{
                headerShown: false
              }}
            />
            :
            <Stack.Screen
              name="SignedOutStackScreen"
              component={SignedOutStackScreen}
              options={{
                headerShown: false
              }}
            />
          }

        </RootStack.Navigator>
      </NavigationContainer>

    </View>
  )

}

export default observer(App,)
