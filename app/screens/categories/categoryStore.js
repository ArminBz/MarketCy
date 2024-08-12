
import {
  action, makeObservable, observable,
} from 'mobx'

import { StoreService, UserService } from "../../../src/services/openapi";



class categoryStore {


  constructor() {

    makeObservable(this, {

      categories: observable,
      errorMessage: observable,
      showErrMessage: observable,
      page:observable,
      onEndReachedLoading:observable,
      flatListOnReachEnd: observable,


      setCategory: action,
      setErrorMessage: action,
      setShowErrMessage: action,
      getCategory: action,
      setPage:action,
      setOnEndReachedLoading:action,
      setFlatListOnReachEnd: action,
    },)
  }

  categories = []
  errorMessage = '';
  showErrMessage = false;
  flatListOnReachEnd=false;
  onEndReachedLoading=false;
  page=1;

  setCategory = (value) => {
    this.categories = value
  }
  setFlatListOnReachEnd=(value)=>{
    this.flatListOnReachEnd = value
  }
  setOnEndReachedLoading=(value)=>{
    this.onEndReachedLoading = value
  }
  setPage=(value)=>{
    this.page = value
  }
  setErrorMessage = (value) => {
    this.errorMessage = value
  }
  setShowErrMessage = (value) => {
    this.showErrMessage = value
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


  getCategory = async () => {
    try {
      const response = await StoreService.getCategories(null,this.page)

      if (response.items && response.items.length === 0) {
        this.setFlatListOnReachEnd(false,)
        this.setOnEndReachedLoading(false,)
      } else {
        this.setFlatListOnReachEnd(true,)
      }
      if (this.categories.length>0) {
        this.setCategory([...this.categories, ...response.items,],)
      }
      else {
        this.setCategory(response.items)
      }

    } catch (err) {
      this.setOnEndReachedLoading(false,)
      console.log('getCategory err', err)
      this.handleError(err)
    }
  }
}

export default categoryStore
