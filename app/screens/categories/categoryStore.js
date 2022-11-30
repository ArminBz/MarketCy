
import {
  action, makeObservable, observable,
} from 'mobx'
import { Stores, } from '../../store'
import { getCategoriesApi, getProductApi } from "../../api/api";


class categoryStore {


  constructor() {

    makeObservable(this, {

      categories:observable,



      setCategory: action,
    },)
  }

  categories=[
    {
      id: '1',
      title: 'Desert',
    },
    {
      id: '2',
      title: 'Meat',
    },
    {
      id: '3',
      title: 'Diary',
    },
    {
      id: '4',
      title: 'Sweets',
    },
    {
      id: '5',
      title: 'Snacks',
    },
    {
      id: '6',
      title: 'Drinks',

    },
  ]


  setCategory = (value) =>{
    this.categories = value
  }


  getCategories = async () => {
    try {
      let data = await getCategoriesApi()
      // this.categories(data,)

      console.log('categories', this.categories,)

    } catch (err) {
      console.log('categories err', err,)
    }
  };

}


export default categoryStore
