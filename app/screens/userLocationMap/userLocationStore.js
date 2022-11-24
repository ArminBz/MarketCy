
import {
  action, makeObservable, observable,
} from 'mobx'
import { Stores, } from '../../store'


class userLocationStore {


  constructor() {

    makeObservable(this, {


      setLatitude:action,
      setLongitude:action,


    },)
  }

  latitude:0
  longitude:0


  setLatitude = (value) =>{
    this.latitude = value
  }
  setLongitude = (value) =>{
    this.longitude = value
  }

}


export default userLocationStore
