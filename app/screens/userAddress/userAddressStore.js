
import {
  action, makeObservable, observable,
} from 'mobx'
import { Stores, } from '../../store'
import { signInApi, userAddressApi } from "../../api/api";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  resetToken, setToken,
} from '../../utils/Api'
import { StoreService,UserService } from "../../../src/services/openapi";
import { Alert } from "react-native";

class userAddressStore {


  constructor() {

    makeObservable(this, {
      errorMessage: observable,
      showErrMessage: observable,
      loading:observable,





      setUserAddress:action,
      setErrorMessage: action,
      setShowErrMessage: action,
      setLoading:action,
    },)
  }

  userAddress:''
  errorMessage = '';
  showErrMessage = false;
  loading=false;

  setErrorMessage = (value) => {
    this.errorMessage = value
  }
  setShowErrMessage = (value) => {
    this.showErrMessage = value
  }
  setLoading = (value) =>{
    this.loading = value
  }
  setUserAddress= (value) =>{
    this.userAddress = value
  }


  // addressOfUser = async () => {
  //   try {
  //     console.log('user', this.userAddress,)
  //     let response = await userAddressApi(this.userAddress)
  //     console.log('address response', response,)
  //
  //   } catch (err) {
  //     console.log('login err', err,)
  //   }
  // }


  handleError = (err) => {
    if (err?.body?.message) {
      this.setErrorMessage(err.body.message)
      this.setShowErrMessage(true)
      console.log('handleError err', err.body.message)
    } else if (err?.message) {
      this.setErrorMessage(err.message)
      this.setShowErrMessage(true)
      console.log('handleError err', err.message)
    }
  }

  addAddresses = async () => {
    try {
      this.setLoading(true)
      console.log("jj",this.userAddress)
      const response = await UserService.addAddress({address:this.userAddress})
      console.log('add address', response)
      if (response) Alert.alert("Address added successfully")

    } catch (err) {
      console.log('add address err', err)
      Alert.alert("Error:",err.message)
      this.handleError(err)
    } finally {
      this.setLoading(false)
    }
  }

  deleteAddresses = async (index) => {
    try {
      this.setLoading(true)
      const response = await UserService.deleteAddress(index)
      console.log('add address', response)
      if (response) alert("Address deleted successfully")
    } catch (err) {
      console.log('add address err', err)
      this.handleError(err)
    } finally {
      this.setLoading(false)
    }
  }


}

export default userAddressStore
