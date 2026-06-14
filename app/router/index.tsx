import React from 'react';
import {COLORS} from '../style';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Intro from '../screens/auth/Intro';
import ListOfProducts from '../screens/products/ListOfProducts';
import Markets from '../screens/tabs/Markets';
import Dashboard from '../screens/tabs/Dashboard';
import VerifyNumber from '../screens/auth/VerifyNumber';
import Search from '../screens/tabs/Search';
import Offer from '../screens/tabs/Offer';
import Map from '../screens/tabs/Map';
import Orders from '../screens/workerScreens/Orders';
import ModalEachProduct from '../screens/products/ModalEachProduct';
import Basket from '../screens/basket/Basket';
import ModalUserAddress from '../screens/userAddress/ModalUserAddress';
import ModalReceiveOrder from '../screens/modal/ModalReceiveOrder';
import WorkerHomePage from '../screens/workerScreens/WorkerHomePage';
import ModalEachProductsFromBasket from '../screens/basket/ModalEachProductsFromBasket';
import ModalOrderProducts from '../screens/workerScreens/ModalOrderProducts';
import {BottomNavigation, IconButton} from 'react-native-paper';
import {Image, View} from 'react-native';
import NavigationService from './NavigationService';
import {useTranslation} from 'react-i18next';
import {Shadow} from 'react-native-shadow-2';

const SignedInStack = createNativeStackNavigator();

export const SignedInStackScreen = () => {
  return (
    <SignedInStack.Navigator
      initialRouteName="TabStackScreen"
      screenOptions={{
        headerTitleStyle: {
          color: COLORS.white,
        },
        headerTintColor: COLORS.white,

        headerStyle: {
          backgroundColor: COLORS.primary,
        },
      }}>
      <SignedInStack.Group>
        <SignedInStack.Screen name="CY.market" component={TabStackScreen} />
        <SignedInStack.Screen name="Login" component={Intro} />
        <SignedInStack.Screen
          name="ListOfProducts"
          component={ListOfProducts}
          options={{
            title: 'Products',
            headerRight: () => (
              <IconButton
                icon="basket"
                iconColor={COLORS.white}
                size={22}
                onPress={() => NavigationService.navigate('Basket')}
              />
            ),
          }}
        />
        <SignedInStack.Screen name="Offer" component={Offer} />
        <SignedInStack.Screen name="Markets" component={Markets} />
        <SignedInStack.Screen name="Basket" component={Basket} />
      </SignedInStack.Group>
      <SignedInStack.Group screenOptions={{presentation: 'modal'}}>
        <SignedInStack.Screen
          name="ModalEachProduct"
          component={ModalEachProduct}
          options={{title: ''}}
        />
        <SignedInStack.Screen
          name="ModalUserAddress"
          component={ModalUserAddress}
          options={{title: ''}}
        />
        <SignedInStack.Screen
          name="ModalReceiveOrder"
          component={ModalReceiveOrder}
          options={{title: ''}}
        />
        <SignedInStack.Screen
          name="ModalEachProductsFromBasket"
          component={ModalEachProductsFromBasket}
          options={{title: ''}}
        />
      </SignedInStack.Group>
    </SignedInStack.Navigator>
  );
};
const SignedOutStack = createNativeStackNavigator();

export const SignedOutStackScreen = () => {
  return (
    <SignedOutStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleStyle: {
          color: COLORS.white,
        },

        headerTintColor: COLORS.white,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
      }}>
      <SignedOutStack.Group>
        <SignedOutStack.Screen name="Login" component={Intro} />
        <SignedOutStack.Screen
          name="Verify Your Number"
          component={VerifyNumber}
        />
      </SignedOutStack.Group>
    </SignedOutStack.Navigator>
  );
};
const WorkerStack = createNativeStackNavigator();
export const WorkerStackScreen = () => {
  return (
    <WorkerStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          color: COLORS.white,
        },

        headerTintColor: COLORS.white,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
      }}>
      <WorkerStack.Group>
        <WorkerStack.Screen
          name="CY.market.admin"
          component={TabStackScreenWorkers}
        />
      </WorkerStack.Group>
      <WorkerStack.Group screenOptions={{presentation: 'modal'}}>
        <SignedInStack.Screen
          name="ModalOrderProducts"
          component={ModalOrderProducts}
          options={{title: ''}}
        />
      </WorkerStack.Group>
    </WorkerStack.Navigator>
  );
};

export const TabStackScreen = () => {
  const {t} = useTranslation();

  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    {
      key: 'markets',
      title: t('Markets'),
      focusedIcon: 'warehouse',
      unfocusedIcon: 'home-outline',
      color: COLORS.primary,
    },
    {
      key: 'map',
      focusedIcon: ({}) => (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: COLORS.primary,
            shadowOpacity: 5,
            shadowRadius: 16.0,
            shadowOffset: {
              height: 0,
              width: 0,
            },
          }}>
          <Shadow
            distance={15}
            startColor={COLORS.shadowGlowStart}
            endColor={COLORS.shadowGlowEnd}
            offset={[3, 4]}>
            <Image
              source={require('../assets/buttomIcon.png')}
              style={{
                width: 75,
                height: 68,
                borderRadius: 30,
                borderWidth: 10,
                borderColor: COLORS.primary,
                resizeMode: 'contain',
              }}
            />
          </Shadow>
        </View>
      ),
      unfocusedIcon: ({}) => (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: COLORS.primary,
            shadowOpacity: 5,
            shadowRadius: 16.0,
            shadowOffset: {
              height: 0,
              width: 0,
            },
          }}>
          <Image
            source={require('../assets/buttomIcon.png')}
            style={{
              width: 75,
              height: 68,
              borderRadius: 30,
              borderWidth: 10,
              borderColor: COLORS.primary,
              resizeMode: 'contain',
            }}
          />
        </View>
      ),
      color: COLORS.primary,
    },
    {
      key: 'dashboard',
      title: t('Dashboard'),
      focusedIcon: 'account-circle',
      unfocusedIcon: 'account-circle-outline',
      color: COLORS.primary,
    },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    markets: Markets,
    dashboard: Dashboard,
    search: Search,
    map: Map,
  });
  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={true}
    />
  );
};

export const TabStackScreenWorkers = () => {
  const {t} = useTranslation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'workerHome',
      title: t('QR Code'),
      focusedIcon: 'qrcode',
      color: COLORS.primary,
    },
    {
      key: 'orders',
      title: t('Orders'),
      focusedIcon: 'order-bool-ascending',
      color: COLORS.primary,
    },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    workerHome: WorkerHomePage,
    orders: Orders,
  });
  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={true}
    />
  );
};
