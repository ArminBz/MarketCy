import {createNavigationContainerRef} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import type {RootStackParamList} from '../types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const navigate = (name: keyof RootStackParamList, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
};

const goBack = () => {
  navigationRef.dispatch(StackActions.pop());
};

const openDrawer = () => {
  navigationRef.dispatch(DrawerActions.openDrawer());
};

const closeDrawer = () => {
  navigationRef.dispatch(DrawerActions.closeDrawer());
};

const currentRoute = () => {
  const route = navigationRef.getCurrentRoute();
  if (route?.name) {
    return route.name;
  }
};

export default {
  navigate,
  goBack,
  openDrawer,
  closeDrawer,
  currentRoute,
};
