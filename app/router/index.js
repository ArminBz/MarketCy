import React from 'react'
import { createNativeStackNavigator, } from '@react-navigation/native-stack'
import Intro from "../screens/auth/Intro";
import ListOfProducts from "../screens/products/ListOfProducts";
import Markets from "../screens/tabs/Markets";
import Dashboard from "../screens/tabs/Dashboard";
import VerifyNumber from "../screens/auth/VerifyNumber";
import Search from "../screens/tabs/Search";
import Offer from "../screens/tabs/Offer";
import Map from "../screens/tabs/Map";
import Orders from "../screens/workerScreens/Orders";
import ModalEachProduct from "../screens/products/ModalEachProduct";
import Basket from "../screens/basket/Basket";
import ModalUserAddress from "../screens/userAddress/ModalUserAddress";
import ModalReceiveOrder from "../screens/modal/ModalReceiveOrder";
import WorkerHomePage from "../screens/workerScreens/WorkerHomePage";
import ModalEachProductsFromBasket from "../screens/basket/ModalEachProductsFromBasket";
import ModalOrderProducts from "../screens/workerScreens/ModalOrderProducts";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome'
import { BottomNavigation, Text, IconButton } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Logo from '../components/Logo'
import { Button, Dimensions, Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import NavigationService from "./NavigationService";
import { useTranslation } from "react-i18next";
import { Shadow } from 'react-native-shadow-2';




const {
  height, width,
} = Dimensions.get('window',)
const SignedInStack = createNativeStackNavigator()

  export const SignedInStackScreen = ()=> {
    const { t, i18n } = useTranslation();
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

            <SignedInStack.Screen name="CY.market" component={TabStackScreen} />
            <SignedInStack.Screen name="Login" component={Intro} />
            <SignedInStack.Screen name="ListOfProducts" component={ListOfProducts} options={{ title: 'Products', headerRight: () => (<IconButton
                icon="basket"
                iconColor={'white'}
                size={22}
                onPress={() => NavigationService.navigate('Basket')}
              /> )}} />
            <SignedInStack.Screen name="Offer" component={Offer} />
            <SignedInStack.Screen name="Markets" component={Markets} />
            <SignedInStack.Screen name="Basket" component={Basket} />
          </SignedInStack.Group>
        <SignedInStack.Group screenOptions={{ presentation: 'modal', }}>
          <SignedInStack.Screen name="ModalEachProduct" component={ModalEachProduct} options={{ title: ''}}/>
          <SignedInStack.Screen name="ModalUserAddress" component={ModalUserAddress} options={{ title: ''}} />
          <SignedInStack.Screen name="ModalReceiveOrder" component={ModalReceiveOrder} options={{ title: ''}}/>
          <SignedInStack.Screen name="ModalEachProductsFromBasket" component={ModalEachProductsFromBasket} options={{ title: ''}}/>

        </SignedInStack.Group>
      </SignedInStack.Navigator>
    );
}
const SignedOutStack = createNativeStackNavigator()

export const SignedOutStackScreen = ()=> {
    return (
      <SignedOutStack.Navigator initialRouteName="Login" screenOptions={{
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
              <SignedOutStack.Screen name="Login" component={Intro} />
            <SignedOutStack.Screen name="Verify Your Number" component={VerifyNumber} />
          </SignedOutStack.Group>
      </SignedOutStack.Navigator>
    );
}
const WorkerStack = createNativeStackNavigator()
export const WorkerStackScreen = ()=> {
  return (
    <WorkerStack.Navigator   screenOptions={{
      headerTitleStyle: {
        color: '#fff',
      },

      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#6200EE',
        fontWeight: 'bold',
      },
    }}>
      <WorkerStack.Group>
        {/*<WorkerStack.Screen name="WorkerHomePage" component={WorkerHomePage} />*/}
        <WorkerStack.Screen name="CY.market.admin" component={TabStackScreenWorkers} />
      </WorkerStack.Group>
      <WorkerStack.Group screenOptions={{ presentation: 'modal', }}>
        <SignedInStack.Screen name="ModalOrderProducts" component={ModalOrderProducts} options={{ title: ''}}/>
      </WorkerStack.Group>
    </WorkerStack.Navigator>
  );
}



const TabStack = createMaterialBottomTabNavigator();




export const TabStackScreen = ()=> {
  const { t, i18n } = useTranslation();

    const [index, setIndex] = React.useState(1);
    const [routes] = React.useState([
      { key: 'markets', title: t('Markets'),focusedIcon: 'warehouse',unfocusedIcon: 'home-outline',color: '#191970' },
      // { key: 'search', title: t('Search'),focusedIcon:'magnify',color: '#BF571A'},
      { key: 'map', focusedIcon:({})=>(
          <View style={{justifyContent: 'center', alignItems: 'center',shadowColor: "#6203EC",
            shadowOpacity: 5,
            shadowRadius: 16.00,
            shadowOffset: {
              height: 0,
              width: 0,
            },}}>
            <Shadow  distance={15} startColor={'#eb9066d8'} endColor={'#ff00ff10'} offset={[3, 4]}>
            <Image source={require('../assets/buttomIcon.png',)} style={{ width: 75,
              height: 68,
            borderRadius:30,borderWidth:10,borderColor:'#6203EC',resizeMode: 'contain'}} />
            </Shadow>
          </View>
        ), unfocusedIcon:({})=>(
    <View style={{justifyContent: 'center', alignItems: 'center',shadowColor: "#6203EC",
      shadowOpacity: 5,
      shadowRadius: 16.00,
      shadowOffset: {
        height: 0,
        width: 0,
      },}}>
        <Image source={require('../assets/buttomIcon.png',)} style={{ width: 75,
          height: 68,
          borderRadius:30,borderWidth:10,borderColor:'#6203EC',resizeMode: 'contain'}} />
    </View>
  ),color: '#312534'},
      // { key: 'offer', title: t('Offer'),focusedIcon: 'star',unfocusedIcon: 'star-outline',color: '#009688'},
      { key: 'dashboard', title: t('Dashboard'),focusedIcon: 'account-circle',unfocusedIcon: 'account-circle-outline',color: '#526E52' },
      // icon:()=> <Icon name='user' color='white'/>
    ]);
    const renderScene = BottomNavigation.SceneMap({
      markets: Markets,
      dashboard: Dashboard,
      search: Search,
      // offer: Offer,
      map:Map,
    });
    return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        shifting={true}
        // barStyle={{height:110,backgroundColor:'#6200EE'}}

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


export const TabStackScreenWorkers = ()=> {
  const { t, i18n } = useTranslation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'workerHome', title: t('QR Code'),focusedIcon: 'qrcode',unfocusedIcon: 'qrcode-outline',color: '#6203EC' },
    { key: 'orders', title: t('Orders'),focusedIcon:'order-bool-ascending',color: '#BF571A'},
  ]);
  const renderScene = BottomNavigation.SceneMap({
    workerHome: WorkerHomePage,
    orders: Orders,
  });
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={true}
    />
  )
}

