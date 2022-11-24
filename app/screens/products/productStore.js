
import {
  action, makeObservable, observable,
} from 'mobx'



class productStore {


  constructor() {

    makeObservable(this, {


      quantityOfProduct: observable,
      selectedProducts:observable,
      addProducts:observable,
      products:observable,



      setQuantityOfProduct:action,
      setSelectedProducts:action,
      setAddProducts:action,


    },)
  }


  quantityOfProduct=0;
  products=[{
    id: 0,
    name: 'Cream Koop',
    image: 'https://www.milkmaid.in/sites/default/files/2022-03/Strawberry-IceCream-590x436.jpg',
    price: 10+'$',
    amount: '100 gr',
    description:'cream ast'
  },
    {
      id: 1,
      name: 'Honey Kantara',
      image: 'https://www.jessicagavin.com/wp-content/uploads/2019/02/honey-pin.jpg',
      price: 9+'$',
      amount: '200 gr',
      description:'honey ast'
    },
    {
      id: 2,
      name: 'Bread Narin',
      image: 'https://www.kingarthurbaking.com/sites/default/files/2020-02/the-easiest-loaf-of-bread-youll-ever-bake.jpg',
      price: 3+'$',
      amount: '12 pices',
      description:'bread ast'
    },
    {
      id: 3,
      name: 'Onion',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Onion_on_White.JPG/1200px-Onion_on_White.JPG',
      price: 7+'$',
      amount: '1',
      description:'onion ast'
    },
    {
      id: 4,
      name: 'Jack Daniels Whiskey',
      image: 'https://www.onlinecava.com/wp-content/uploads/2020/05/jack-daniels-100cl.jpg',
      price: 2+'$',
      amount: '350 ml',
      description:'jack ast'
    },
    {
      id: 5,
      name: 'Kinder White Chocolate',
      image: 'https://www.alphamega.com.cy/Admin/Public/GetImage.ashx?Width=800&Height=800&Crop=5&DoNotUpscale=True&FillCanvas=True&Image=/Files/Images/Ecom/Products/334743.jpg&AlternativeImage=/Images/missing_image.jpg',
      price: 2+'$',
      amount: '1, 20 gr',
      description:'kinder ast'
    },
  ]
  selectedProducts={}
  addProducts=[]

  setSelectedProducts=(value)=>{
    this.selectedProducts = value
  }


  setQuantityOfProduct= (value) =>{

    this.quantityOfProduct = value
  }
  setAddProducts= (value) =>{
    this.addProducts.push(value)
  }
  sumOfBasket = () =>{
    let quantity
    let sum=0
    for (const value of this.addProducts)
    {
      quantity=value.quantityOfProduct
      sum += value.price.replace(/[^0-9.]/g, '')*quantity;
    }
    return sum;
  }

}


export default productStore
