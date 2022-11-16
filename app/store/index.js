import AuthStore from '../screens/auth/authStore'
import React from 'react'


class RootStore {
    constructor() {
        this.authStore = new AuthStore(this,)

    }
}
const StoresContext = React.createContext(new RootStore(),)
// this will be the function available for the app to connect to the stores
export const useStores = () => React.useContext(StoresContext,)

export const Stores = StoresContext._currentValue
