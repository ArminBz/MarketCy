import React from 'react'
import { createNativeStackNavigator, } from '@react-navigation/native-stack'
import Intro from "../screens/auth/Intro";
import ListOfProducts from "../screens/products/ListOfProducts";
import Home from "../screens/tabs/Home";
import Dashboard from "../screens/tabs/Dashboard";
import VerifyNumber from "../screens/auth/VerifyNumber";
import Search from "../screens/tabs/Search";
import Offer from "../screens/tabs/Offer";
import ModalEachProduct from "../screens/products/ModalEachProduct";
import Basket from "../screens/basket/Basket";
import ModalUserAddress from "../screens/userAddress/ModalUserAddress";
import ModalReceiveOrder from "../screens/modal/ModalReceiveOrder";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome'
import { BottomNavigation, Text, IconButton } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Logo from '../components/Logo'
import { Button, Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import NavigationService from "./NavigationService";

const SignedInStack = createNativeStackNavigator()

  export const SignedInStackScreen = ()=> {
    return (
      <SignedInStack.Navigator initialRouteName="TabStackScreen" screenOptions={{
        headerTitleStyle: {
          color: '#fff',
        },
        headerTintColor: '#fff',

        headerStyle: {
          backgroundColor: '#6200EE',
          fontWeight: 'bold',
        },
      }}
      >
          <SignedInStack.Group>

            <SignedInStack.Screen name="Markets" component={TabStackScreen} />
            <SignedInStack.Screen name="Intro" component={Intro} />
            <SignedInStack.Screen name="ListOfProducts" component={ListOfProducts} options={{ title: 'Products', headerRight: () => (<IconButton
                icon="basket"
                iconColor={'white'}
                size={22}
                onPress={() => NavigationService.navigate('Basket')}
              /> )}} />
            <SignedInStack.Screen name="Offer" component={Offer} />
            <SignedInStack.Screen name="Home" component={Home} />
            <SignedInStack.Screen name="Basket" component={Basket} />
          </SignedInStack.Group>
        <SignedInStack.Group screenOptions={{ presentation: 'modal', }}>
          <SignedInStack.Screen name="ModalEachProduct" component={ModalEachProduct} />
          <SignedInStack.Screen name="ModalUserAddress" component={ModalUserAddress} />
          <SignedInStack.Screen name="ModalReceiveOrder" component={ModalReceiveOrder} />

        </SignedInStack.Group>
      </SignedInStack.Navigator>
    );
}
const SignedOutStack = createNativeStackNavigator()


export const SignedOutStackScreen = ()=> {
    return (
      <SignedOutStack.Navigator initialRouteName="Intro" screenOptions={{
        headerTitleStyle: {
          color: '#fff',
        },

        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#6200EE',
          fontWeight: 'bold',
        },
      }}>
          <SignedOutStack.Group>
              <SignedOutStack.Screen name="Intro" component={Intro} />
            <SignedOutStack.Screen name="VerifyNumber" component={VerifyNumber} />
          </SignedOutStack.Group>
      </SignedOutStack.Navigator>
    );
}
const TabStack = createMaterialBottomTabNavigator();




export const TabStackScreen = ()=> {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'home', title: 'Home',focusedIcon: 'home',unfocusedIcon: 'home-outline',color: '#6200EE' },
      { key: 'search', title: 'Search',focusedIcon:'magnify',unfocusedIcon: 'magnify-outline',color: '#3F51B5'},
      { key: 'offer', title: 'Offer',focusedIcon: 'star',unfocusedIcon: 'star-outline',color: '#009688'},
      { key: 'dashboard', title: 'Dashboard',focusedIcon: 'account-circle',unfocusedIcon: 'account-circle-outline',color: '#795548' },
      // icon:()=> <Icon name='user' color='white'/>
    ]);
    const renderScene = BottomNavigation.SceneMap({
      home: Home,
      dashboard: Dashboard,
      search: Search,
      offer: Offer,
    });
    return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: '#694fad' }}
      />
    //   <TabStack.Navigator useLegacyImplementation={true} drawerContent={(props,) => <DrawerNav {...props} />}>
    //       <TabStack.Screen name="Home" component={Home} options={{
    //         tabBarIcon: ({ color }) => (
    //           <Icon name="home" color={color} size={26} />
    //         ), tabBarBadge: 3 }} />
    //       <TabStack.Screen name="Dashboard" component={Dashboard} />
    //   </TabStack.Navigator>

    )
}



