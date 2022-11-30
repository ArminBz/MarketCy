
import {
  action, makeObservable, observable,
} from 'mobx'
import { Stores, } from '../../store'
import { signInApi, userAddressApi } from "../../api/api";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  resetToken, setToken,
} from '../../utils/Api'

class userAddressStore {


  constructor() {

    makeObservable(this, {




      setUserAddress:action,
    },)
  }

  userAddress:''



  setUserAddress= (value) =>{
    this.userAddress = value
  }


  addressOfUser = async () => {
    try {
      console.log('user', this.userAddress,)
      let response = await userAddressApi(this.userAddress)
      console.log('address response', response,)

    } catch (err) {
      console.log('login err', err,)
    }
  };



}

export default userAddressStore
