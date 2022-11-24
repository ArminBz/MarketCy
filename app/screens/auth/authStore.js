
import {
    action, makeObservable, observable,
} from 'mobx'
import { Stores, } from '../../store'


class AuthStore {


    constructor() {

        makeObservable(this, {
            phoneNumber: observable,
            codeCheck: observable,
            userSignedIn: observable,
            itemsPerPage: observable,





            setPhoneNumber: action,
            setCodeCheck: action,
            login: action,
            setItemsPerPage:action,

        },)
    }


    phoneNumber = '';
    codeCheck = '';
    userSignedIn=false;
    itemsPerPage=0;


    setPhoneNumber = (value) =>{
        this.phoneNumber = value
    }
    setCodeCheck = (value) =>{
        this.codeCheck = value
    }

    login = () =>{
       if( this.codeCheck)
          this.userSignedIn=true
        else
            alert("Enter the code")

    }

    setItemsPerPage= (value) =>{
        this.itemsPerPage = value
    }

}


export default AuthStore
