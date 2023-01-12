import AuthStore from '../screens/auth/authStore'
import productStore from '../screens/products/productStore'
import categoryStore from '../screens/categories/categoryStore'
import userAddressStore from '../screens/userAddress/userAddressStore'
import userLocationStore from '../screens/userLocationMap/userLocationStore'
import offerStore from '../screens/tabs/offerStore'
import languageStore from '../screens/translation/languageStore'
import basketStore from '../screens/basket/basketStore'
import workerStore from '../screens/workerScreens/workerStore'




import React from 'react'


class RootStore {
    constructor() {
        this.authStore = new AuthStore(this,)
        this.productStore = new productStore(this,)
        this.categoryStore = new categoryStore(this,)
        this.userAddressStore = new userAddressStore(this,)
        this.userLocationStore = new userLocationStore(this,)
        this.offerStore = new offerStore(this,)
        this.languageStore = new languageStore(this,)
        this.basketStore = new basketStore(this,)
        this.workerStore = new workerStore(this,)


    }
}
const StoresContext = React.createContext(new RootStore(),)
// this will be the function available for the app to connect to the stores
export const useStores = () => React.useContext(StoresContext,)

export const Stores = StoresContext._currentValue
