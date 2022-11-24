
import {
  action, makeObservable, observable,
} from 'mobx'
import { Stores, } from '../../store'


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
}

export default userAddressStore
