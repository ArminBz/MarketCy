import AuthStore from '../screens/auth/authStore';
import ProductStore from '../screens/products/productStore';
import CategoryStore from '../screens/categories/categoryStore';
import UserAddressStore from '../screens/userAddress/userAddressStore';
import UserLocationStore from '../screens/userLocationMap/userLocationStore';
import OfferStore from '../screens/tabs/offerStore';
import LanguageStore from '../screens/translation/languageStore';
import BasketStore from '../screens/basket/basketStore';
import WorkerStore from '../screens/workerScreens/workerStore';

import React from 'react';

class RootStore {
  authStore = new AuthStore();
  productStore = new ProductStore();
  categoryStore = new CategoryStore();
  userAddressStore = new UserAddressStore();
  userLocationStore = new UserLocationStore();
  offerStore = new OfferStore();
  languageStore = new LanguageStore();
  basketStore = new BasketStore();
  workerStore = new WorkerStore();
}

// A single root-store instance backs both the React context and the
// `Stores` singleton used by store methods that run outside the component tree.
export const Stores = new RootStore();

const StoresContext = React.createContext(Stores);
// The hook the app uses to connect to the stores.
export const useStores = () => React.useContext(StoresContext);
