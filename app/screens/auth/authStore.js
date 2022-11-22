
import {
    action, makeObservable, observable,
} from 'mobx'
import { Stores, } from '../../store'


class AuthStore {


    constructor() {

        makeObservable(this, {
            email: observable,
            phoneNumber: observable,
            codeCheck: observable,
            userSignedIn: observable,
            tablePage: observable,
            itemsPerPage: observable,
            quantityOfProduct: observable,
            products:observable,
            selectedProducts:observable,
            categories:observable,
            addProducts:observable,





            setPhoneNumber: action,
            setEmail: action,
            setCodeCheck: action,
            login: action,
            setTablePage: action,
            setItemsPerPage:action,
            setQuantityOfProduct:action,
            setSelectedProducts:action,
            setAddProducts:action,
            setUserAddress:action,
            setLatitude:action,
            setLongitude:action,






        },)
    }


    email = '';
    phoneNumber = '';
    codeCheck = '';
    userSignedIn=false;
    tablePage=0;
    itemsPerPage=0;
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


    offer=[{
        id:1,
        image:'https://img.freepik.com/free-vector/gradient-local-market-sale-banner_23-2149462019.jpg?w=2000'
    },
        {
           id:2,
           image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/christmas-market-sale-banner-design-template-611f7a7922d6b11d2899f5d00047189f_screen.jpg?ts=1561432239'
        },
        {
            id:3,
            image: 'https://img.freepik.com/premium-psd/vegetable-facebook-cover-template_349013-44.jpg?w=2000'
        },
    ]


    selectedProducts={}
    addProducts=[]
    userAddress:''
    latitude:35.2972
    longitude:33.8969






    setLatitude = (value) =>{
        this.latitude = value
    }
    setLongitude = (value) =>{
        this.longitude = value
    }


    setEmail = (value) =>{
        this.email = value
    }
    setPhoneNumber = (value) =>{
        this.phoneNumber = value
    }
    setCodeCheck = (value) =>{
        this.codeCheck = value
    }
    setSelectedProducts=(value)=>{
        this.selectedProducts = value
    }

    login = () =>{
       if( this.codeCheck)
          this.userSignedIn=true
        else
            alert("Enter the code")

    }
    setTablePage= (value) =>{
        this.tablePage = value
    }
    setItemsPerPage= (value) =>{
        this.itemsPerPage = value
    }
    setQuantityOfProduct= (value) =>{

        this.quantityOfProduct = value
    }
    setAddProducts= (value) =>{
        this.addProducts.push(value)
    }
    setUserAddress= (value) =>{
        this.userAddress = value
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


export default AuthStore
