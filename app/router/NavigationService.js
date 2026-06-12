import {createNavigationContainerRef} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

const navigate = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
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
