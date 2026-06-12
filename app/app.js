import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  SignedInStackScreen,
  SignedOutStackScreen,
  WorkerStackScreen,
} from './router';
import {observer} from 'mobx-react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {navigationRef} from './router/NavigationService';
import {useStores} from './store';
import {OpenAPI} from '../src/services/openapi';
import Landing from './screens/landing/Landing';
import './screens/translation/i18n';

OpenAPI.BASE = 'https://m.up.railway.app';

const RootStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const {authStore} = useStores();

  useEffect(() => {
    authStore.checkIsSignedIn();
  }, [authStore]);

  return (
    <View style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator>
          {authStore.checkIsSignedInLoading ? (
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{
                headerShown: false,
                headerBackTitleVisible: false,
              }}
            />
          ) : authStore.loggedIn === true &&
            authStore.checkUserStatus === null ? (
            <Stack.Screen
              name="SignedInStackScreen"
              component={SignedInStackScreen}
              options={{
                headerShown: false,
              }}
            />
          ) : authStore.loggedIn === true &&
            authStore.checkUserStatus !== null ? (
            <Stack.Screen
              name="WorkerStackScreen"
              component={WorkerStackScreen}
              options={{
                headerShown: false,
              }}
            />
          ) : authStore.loggedIn === false ? (
            <Stack.Screen
              name="SignedOutStackScreen"
              component={SignedOutStackScreen}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{
                headerShown: false,
                headerBackTitleVisible: false,
              }}
            />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default observer(App);
