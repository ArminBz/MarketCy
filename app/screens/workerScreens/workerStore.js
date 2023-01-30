
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
      searchResult: observable,
      priceToString:observable,
      discountPriceToString:observable,
      orders:observable,
      selectedOrderProducts:observable,
      orderID:observable,
      priceProduct:observable,
      discountPriceProduct:observable,



      setErrorMessage: action,
      setShowErrMessage: action,
      setLoading:action,
      setSearchResult: action,
      setPriceToString:action,
      setDiscountPriceToString:action,
      setOrders:action,
      setSelectedOrderProducts:action,
      setOrderID:action,
      setPriceProduct:action,
      setDiscountPriceProduct:action
    },)
  }

  errorMessage = '';
  showErrMessage = false;
  loading=false;
  searchResult={};
  priceToString=''
  discountPriceToString=''
  orders={}
  selectedOrderProducts={}
  orderID={}
  priceProduct=0
  discountPriceProduct=0



  setErrorMessage = (value) => {
    this.errorMessage = value
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
  setOrders = (value) =>{
    this.orders = value
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
    } finally {
      this.setLoading(false)
    }
  }


  adminCreateProduct = async (barCode,price,discount_price,available) => {
    try {
      this.setLoading(true)
      const response = await StoreService.adminCreateProduct({barcode:barCode,price:price,discount_price:discount_price,available:available})
      alert(response.message)
      // console.log("barCode search",response)
      console.log('add response', response)
    } catch (err) {
      console.log('login err', err)
      this.handleError(err)
    } finally {
      this.setLoading(false)
    }
  }

  getAdminOrders = async (status) => {
    try {
      this.setLoading(true)
      const response = await StoreService.adminGetOrders(status)
      // console.log("AdminGetOrders",response)
      this.setOrders(response)

    } catch (err) {
      console.log('login err', err)
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
      this.setOrders(response)

    } catch (err) {
      console.log('login err', err)
      this.handleError(err)
    } finally {
      this.setLoading(false)
    }
  }
}

export default workerStore
