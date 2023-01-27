
import {
  action, makeObservable, observable,
} from 'mobx'
import { basketReceiptApi, getOffersApi, getProductApi, signInApi } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "../../utils/Api";
import { Stores, } from '../../store'
import authStore from "../auth/authStore";
import { StoreService } from "../../../src/services/openapi";
import feather from "react-native-vector-icons/Feather";




class productStore {


  constructor() {

    makeObservable(this, {


      quantityOfProduct: observable,
      selectedProducts:observable,
      addProducts:observable,
      loading:observable,
      errorMessage: observable,
      showErrMessage: observable,
      product:observable,
      selectedProductByCat:observable,
      payment:observable,
      selectedCategories:observable,
      page:observable,
      onEndReachedLoading:observable,
      flatListOnReachEnd: observable,
      idMarkets:observable,



      setQuantityOfProduct:action,
      setSelectedProducts:action,
      setAddProducts:action,
      setErrorMessage: action,
      setLoading:observable,
      setShowErrMessage: action,
      setProduct:action,
      setPayment:action,
      setSelectedCategories:action,
      setSelectedProductByCat:action,
      setPage:action,
      setOnEndReachedLoading:action,
      setFlatListOnReachEnd: action,
      setIdMarkets:action,


    },)
  }

  errorMessage = '';
  loading=false;
  flatListOnReachEnd=false;
  onEndReachedLoading=false;
  page=1;
  selectedProductByCat = [];
  payment='';
  product=[];
  showErrMessage = false;
  quantityOfProduct=0;
  selectedProducts={}
  addProducts=[]
  selectedCategories={}
  idMarkets=0

  setSelectedProductByCat=(value)=>{
    this.selectedProductByCat = value
  }
  setIdMarkets=(value)=>{
    this.idMarkets = value
  }
  setLoading=(value)=>{
    this.loading = value
  }
  setFlatListOnReachEnd=(value)=>{
    this.flatListOnReachEnd = value
  }
  setOnEndReachedLoading=(value)=>{
    this.onEndReachedLoading = value
  }
  setSelectedProducts=(value)=>{
    this.selectedProducts = value
  }
  setSelectedCategories=(value)=>{
    this.selectedCategories = value
  }
  setPage=(value)=>{
    this.page = value
  }

  setQuantityOfProduct= (value) =>{

    this.quantityOfProduct = value
  }
  setAddProducts= (value) =>{
    this.addProducts.push(value)
  }
  setErrorMessage = (value) => {
    this.errorMessage = value
  }
  setShowErrMessage = (value) => {
    this.showErrMessage = value
  }
  setPayment = (value) => {
    this.payment = value
  }

  setProduct = (value)=>{
    this.product = value
  }
  sumOfBasket = () =>{
    let quantity
    let sum=0
    for (const value of this.addProducts)
    {
      quantity=value.quantityOfProduct
      // sum += value.price.replace(/[^0-9.]/g, '')*quantity;
    }
    return sum;
  }






  orderReceipt = async () => {
    try {
      // this.setLoginLoading(true,)
      // this.setServerError(null,)
      // console.log('user', Stores.userAddressStore.userAddress,this.selectedProducts)
      const response = await basketReceiptApi(Stores.userAddressStore.userAddress,this.selectedProducts,Stores.authStore.phoneNumber)
      console.log('receipt response', response,)
    } catch (err) {

      console.log('login err', err,)
    }
  };

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



  getProducts = async (storeId,categoryId,search,page) => {
    try {
      this.setLoading(true)
      const response = await StoreService.getProducts(storeId,categoryId,search,page)
      console.log('getProducts res',response)
      // this.setSelectedProductByCat(response.items)
      // console.log('product',response.items.map(i=> i.product))
      // return response
      // this.setProduct(response.items)
      // this.setSelectedProducts(response.items)
      if (response.items && response.items.length === 0) {
        this.setFlatListOnReachEnd(false,)
        this.setOnEndReachedLoading(false,)
      } else {
        this.setFlatListOnReachEnd(true,)
      }
      if (this.product.length>0) {
        this.setProduct([...this.product, ...response.items,],)
      } else {
        this.setProduct(response.items)

      }
      this.setOnEndReachedLoading(false,)

      // console.log("man product",response.items.map(i=> i.product))
      // console.log("man product",response)
    } catch (err) {
      console.log('getProd err', err)
      this.setOnEndReachedLoading(false,)
      this.handleError(err)
    } finally {
      this.setLoading(false)
    }
  }


  // getAllProducts = async () => {
  //   try {
  //     this.setLoading(true)
  //     const response = await StoreService.getProduct()
  //
  //     if (response.items && response.items.length === 0) {
  //       this.setFlatListOnReachEnd(false,)
  //       this.setOnEndReachedLoading(false,)
  //     } else {
  //       this.setFlatListOnReachEnd(true,)
  //     }
  //     if (this.product.length>0) {
  //       this.setProduct([...this.product, ...response.items,],)
  //     } else {
  //       this.setProduct(response.items)
  //
  //     }
  //     this.setOnEndReachedLoading(false,)
  //
  //     // console.log("man product",response.items.map(i=> i.product))
  //     // console.log("man product",response)
  //   } catch (err) {
  //     console.log('login err', err)
  //     this.setOnEndReachedLoading(false,)
  //     this.handleError(err)
  //   } finally {
  //     this.setLoading(false)
  //   }
  // }

}


export default productStore
