
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
import { Alert } from "react-native";

class workerStore {


  constructor() {

    makeObservable(this, {
      errorMessage: observable,
      showErrMessage: observable,
      loading:observable,
      searchResult: observable,
      priceToString:observable,
      discountPriceToString:observable,
      pendingOrders:observable,
      selectedOrderProducts:observable,
      orderID:observable,
      priceProduct:observable,
      discountPriceProduct:observable,
      acceptedOrders:observable,
      rejectedOrders:observable,
      deliveredOrders:observable,



      setErrorMessage: action,
      setShowErrMessage: action,
      setLoading:action,
      setSearchResult: action,
      setPriceToString:action,
      setDiscountPriceToString:action,
      setPendingOrders:action,
      setSelectedOrderProducts:action,
      setOrderID:action,
      setPriceProduct:action,
      setDiscountPriceProduct:action,
      setAcceptedOrders:action,
      setRejectedOrders:action,
      setDeliveredOrders:action,
    },)
  }

  errorMessage = '';
  showErrMessage = false;
  loading=false;
  searchResult={};
  priceToString=''
  discountPriceToString=''
  pendingOrders={}
  selectedOrderProducts={}
  orderID={}
  priceProduct=0
  discountPriceProduct=0
  acceptedOrders={}
  rejectedOrders={}
  deliveredOrders={}



  setErrorMessage = (value) => {
    this.errorMessage = value
  }
  setDeliveredOrders = (value) => {
    this.deliveredOrders = value
  }
  setRejectedOrders = (value) => {
    this.rejectedOrders = value
  }
  setDiscountPriceProduct = (value) => {
    this.discountPriceProduct = value
  }
  setPriceProduct = (value) => {
    this.priceProduct = value
  }
  setOrderID = (value) => {
    this.orderID = value
  }
  setSelectedOrderProducts = (value) => {
    this.selectedOrderProducts = value
  }
  setShowErrMessage = (value) => {
    this.showErrMessage = value
  }
  setLoading = (value) =>{
    this.loading = value
  }
  setSearchResult = (value) =>{
    this.searchResult = value
  }
  setPriceToString = (value) =>{
    this.priceToString = value
  }
  setDiscountPriceToString = (value) =>{
    this.discountPriceToString = value
  }
  setPendingOrders = (value) =>{
    this.pendingOrders = value
  }
  setAcceptedOrders = (value) =>{
    this.acceptedOrders = value
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
      // console.log("barCode search",response)
      this.setSearchResult({})
      this.setSearchResult(response)
      console.log("barCode search",response.discount_price)
      this.setPriceProduct(response.price)
      this.setDiscountPriceProduct(response.discount_price)
      this.setPriceToString(response.price.toString())
      this.setDiscountPriceToString(response.discount_price.toString())
    } catch (err) {
      console.log('login err', err)
      this.handleError(err)
      // Alert.alert('Error:',err.message)
    } finally {
      this.setLoading(false)
    }
  }


  adminCreateProduct = async (barCode,price,discount_price,available) => {
    try {
      this.setLoading(true)
      const response = await StoreService.adminCreateProduct({barcode:barCode,price:price,discount_price:discount_price,available:available})
      Alert.alert('Successful',response.message)
      // console.log("barCode search",response)
      console.log('add response', response)
    } catch (err) {
      console.log('adminCreateProd err', err)
      Alert.alert('Error:',err.message)
      this.handleError(err)
    } finally {
      this.setLoading(false)
    }
  }

  getAdminPendingOrders = async () => {
    try {
      this.setLoading(true)
      const response = await StoreService.adminGetOrders('pending')
      // console.log("AdminGetOrders",response)
      this.setPendingOrders(response)

    } catch (err) {
      console.log('adminPendingGetOrder', err)
      this.handleError(err)
    } finally {
      this.setLoading(false)
    }
  }

  getAdminAcceptOrders = async () => {
    try {
      this.setLoading(true)
      const response = await StoreService.adminGetOrders('accepted')
      // console.log("AdminGetOrders",response)
      this.setAcceptedOrders(response)

    } catch (err) {
      console.log('adminAcceptedGetOrder', err)
      this.handleError(err)
    } finally {
      this.setLoading(false)
    }
  }

  getAdminRejectedOrders = async () => {
    try {
      this.setLoading(true)
      const response = await StoreService.adminGetOrders('rejected')
      // console.log("AdminGetOrders",response)
      this.setRejectedOrders(response)

    } catch (err) {
      console.log('adminAcceptedGetOrder', err)
      this.handleError(err)
    } finally {
      this.setLoading(false)
    }
  }

  getAdminDeliveredOrders = async () => {
    try {
      this.setLoading(true)
      const response = await StoreService.adminGetOrders('delivered')
      // console.log("AdminGetOrders",response)
      this.setDeliveredOrders(response)

    } catch (err) {
      console.log('adminAcceptedGetOrder', err)
      this.handleError(err)
    } finally {
      this.setLoading(false)
    }
  }

  adminUpdateOrderStatus = async (orderId,status) => {
    try {
      this.setLoading(true)
      const response = await StoreService.adminUpdateOrderStatus(orderId,status)
      console.log("update admin orders",response)
      // this.setOrders(response)
      Alert.alert("Successful",response.message)

    } catch (err) {
      console.log('adminUpdateOrder err', err)
      Alert.alert("Error:",err.message)
      this.handleError(err)
    } finally {
      this.setLoading(false)
    }
  }
}

export default workerStore
