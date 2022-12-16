
import {
  action, makeObservable, observable,
} from 'mobx'
// import { Stores, } from '../../store'
// import { getCategoriesApi, getProductApi } from "../../api/api";
import { StoreService, UserService } from "../../../src/services/openapi";
import NavigationService from "../../router/NavigationService";


class categoryStore {


  constructor() {

    makeObservable(this, {

      categories: observable,
      errorMessage: observable,
      showErrMessage: observable,


      setCategory: action,
      setErrorMessage: action,
      setShowErrMessage: action,
      getCategory: action,
    },)
  }

  categories = [{

  }
  ]
  errorMessage = '';
  showErrMessage = false;

  setCategory = (value) => {
    this.categories = value
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
      const response = await StoreService.getCategories(1)

      console.log('salam',response.items)
      this.setCategory(response.items)
       // return response

    } catch (err) {
      console.log('login err', err)
      this.handleError(err)
    }
  }
}

export default categoryStore
