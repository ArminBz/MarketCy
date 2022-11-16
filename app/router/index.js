import React from 'react'
import { createNativeStackNavigator, } from '@react-navigation/native-stack'
import Intro from "../screens/login/Intro";
import ListOfProducts from "../screens/products/ListOfProducts";
import Home from "../screens/tabs/Home";
import Dashboard from "../screens/tabs/Dashboard";
import VerifyNumber from "../screens/login/VerifyNumber";
import Search from "../screens/tabs/Search";
import Offer from "../screens/tabs/Offer";
import ModalEachProduct from "../screens/modal/ModalEachProduct";
import Basket from "../screens/basket/Basket";
import UserAddress from "../screens/modal/UserAddress";
import ReceiveOrder from "../screens/modal/ReceiveOrder";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome'
import { BottomNavigation, Text, IconButton, Colors } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Logo from '../components/Logo'
import { Button, Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import { white } from "react-native-paper/lib/typescript/styles/colors";
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
                color={Colors.white}
                size={22}
                onPress={() => NavigationService.navigate('Basket')}
              /> )}} />
            <SignedInStack.Screen name="Offer" component={Offer} />
            <SignedInStack.Screen name="Home" component={Home} />
            <SignedInStack.Screen name="Basket" component={Basket} />
          </SignedInStack.Group>
        <SignedInStack.Group screenOptions={{ presentation: 'modal', }}>
          <SignedInStack.Screen name="ModalEachProduct" component={ModalEachProduct} />
          <SignedInStack.Screen name="UserAddress" component={UserAddress} />
          <SignedInStack.Screen name="ReceiveOrder" component={ReceiveOrder} />

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
      { key: 'home', title: 'Home',icon: 'home',color: '#6200EE' },
      { key: 'search', title: 'Search',icon:'magnify',color: '#3F51B5'},
      { key: 'offer', title: 'Offer',icon: 'star',color: '#009688'},
      { key: 'dashboard', title: 'Dashboard',icon: 'account-circle',color: '#795548' },
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



