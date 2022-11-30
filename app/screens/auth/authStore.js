
import {
    action, makeObservable, observable,
} from 'mobx'
import { Stores, } from '../../store'
import { signInApi, } from '../../api/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    resetToken, setToken,
} from '../../utils/Api'


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




    loginnn = async () => {
        try {
            // this.setLoginLoading(true,)
            // this.setServerError(null,)
            let number
            console.log('user', number,)
            let response = await signInApi(this.phoneNumber)
            console.log('login response', response,)
            if (response && response.token) {
                // setting new system token to local storage[]\AsyncStorage.setItem('token', response.token,)

                // setting legacy token to local storage
                AsyncStorage.setItem('legacyToken', response.token,)

                // setting new system token in axios with new system host url
                setToken(response.token,)
                // setting legacy token in axios with legacy host url
                // const realm = await openRealm()
                // const realmOpen =await Realm.open(schema)
                // console.log('realmOpen==>',realmOpen)

                // checking for the legacy woshers in realm
                // Stores.realmStore.createUser(response.token, response.legacyToken,)

                // this.setLoginLoading(false,)
                //
                // this.setLoggedIn(true,)
                //
                // Firebase.setLogEvent('user_loggedIn',)
            }
        } catch (err) {
            // this.setLoginLoading(false,)

            console.log('login err', err,)
        }
    };

}


export default AuthStore
