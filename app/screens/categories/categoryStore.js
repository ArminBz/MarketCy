
import {
  action, makeObservable, observable,
} from 'mobx'
import { Stores, } from '../../store'


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
}


export default categoryStore
