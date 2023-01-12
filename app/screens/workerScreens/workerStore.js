
import {
  action, makeObservable, observable,
} from 'mobx'
import { Stores, } from '../../store'
import { signInApi, userAddressApi } from "../../api/api";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  resetToken, setToken,
} from '../../utils/Api'
import { StoreService } from "../../../src/services/openapi";

class workerStore {


  constructor() {

    makeObservable(this, {
      errorMessage: observable,
      showErrMessage: observable,
      loading:observable,



      setErrorMessage: action,
      setShowErrMessage: action,
      setLoading:action,
    },)
  }

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


  getProductByBarcode = async (barCode) => {
    try {
      this.setLoading(true)
      const response = await StoreService.adminGetProduct(barCode)
      console.log("barCode search",response)
      // return response

    } catch (err) {
      console.log('login err', err)
      this.handleError(err)
    } finally {
      this.setLoading(false)
    }
  }
}

export default workerStore
