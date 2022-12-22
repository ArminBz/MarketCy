import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SignedInStackScreen, SignedOutStackScreen, TabStackScreen } from "./router";
import { observer } from "mobx-react";
import { createNativeStackNavigator, } from '@react-navigation/native-stack'
import {
  AppState, Platform, View, SafeAreaView, Pressable, Text,
} from "react-native";
import { navigationRef, } from './router/NavigationService'
import { useEffect, useState } from "react";
import { useStores } from "./store";
import { OpenAPI } from "../src/services/openapi";
import Landing from "./screens/landing/Landing";
import './screens/translation/i18n';
import {useTranslation} from 'react-i18next';
const App: () => Node = () => {


  const {
    authStore,
    categoryStore
  } = useStores()

  useEffect(()=>{
    authStore.checkIsSignedIn()
  }, [],)




  // componentDidMount Before
  // useEffect(()=>{
  //
  // },[])

  const RootStack = createNativeStackNavigator()
  const Stack = createNativeStackNavigator()
  const Tab = createBottomTabNavigator();
  OpenAPI.BASE ='https://m.up.railway.app'
  return (
    <View style={{ flex: 1,}}>
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator>
          {authStore.checkIsSignedInLoading ?
            (
              <Stack.Screen
                name="Landing"
                component={Landing}
                options={{
                  headerShown: false, headerBackTitleVisible: false,
                }}
              />
            ): authStore.loggedIn===true ?
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
