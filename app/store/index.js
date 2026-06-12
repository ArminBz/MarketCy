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
  constructor() {
    this.authStore = new AuthStore(this);
    this.productStore = new ProductStore(this);
    this.categoryStore = new CategoryStore(this);
    this.userAddressStore = new UserAddressStore(this);
    this.userLocationStore = new UserLocationStore(this);
    this.offerStore = new OfferStore(this);
    this.languageStore = new LanguageStore(this);
    this.basketStore = new BasketStore(this);
    this.workerStore = new WorkerStore(this);
  }
}

const StoresContext = React.createContext(new RootStore());
// this will be the function available for the app to connect to the stores
export const useStores = () => React.useContext(StoresContext);

export const Stores = StoresContext._currentValue;
