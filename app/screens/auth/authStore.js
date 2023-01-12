
import {
    action, makeObservable, observable,
} from 'mobx'
import { Stores, } from '../../store'
import { signInApi, } from '../../api/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    resetToken, setToken,
} from '../../utils/Api'
import { OpenAPI, UserService } from "../../../src/services/openapi";
import NavigationService from "../../router/NavigationService";


class AuthStore {


    constructor() {

        makeObservable(this, {
            phoneNumber: observable,
            codeCheck: observable,
            userSignedIn: observable,
            itemsPerPage: observable,
            loading:observable,
            errorMessage:observable,
            showErrMessage:observable,
            confirmPhone:observable,
            responseMessage:observable,
            checkIsSignedInLoading: observable,
            loggedIn: observable,
            checkUserStatus:observable,







            setPhoneNumber: action,
            setCodeCheck: action,
            login: action,
            setItemsPerPage:action,
            setLoading:action,
            setErrorMessage:action,
            setShowErrMessage:action,
            setConfirmPhone:action,
            setResponseMessage:action,
            checkIsSignedIn: action,
            setCheckIsSignedInLoading: action,
            setLoggedIn: action,
            onSignOut: action,
            setCheckUserStatus:action,

        },)
    }


    phoneNumber = '';
    codeCheck = '';
    userSignedIn=false;
    itemsPerPage=0;
    loading=false;
    errorMessage='';
    showErrMessage=false;
    confirmPhone=0;
    responseMessage='';
    checkIsSignedInLoading = false;
    loggedIn = false;
    checkUserStatus=null;


    setPhoneNumber = (value) =>{
        this.phoneNumber = value
    }
    setCodeCheck = (value) =>{
        this.codeCheck = value
    }
    setLoading = (value) =>{
        this.loading = value
    }
    setErrorMessage = (value) =>{
        this.errorMessage = value
    }
    setShowErrMessage = (value) =>{
        this.showErrMessage = value
    }
    setConfirmPhone = (value) =>{
        this.confirmPhone = value
    }
    setResponseMessage = (value) =>{
        this.responseMessage = value
    }
    setCheckIsSignedInLoading = (value,) =>{
        this.checkIsSignedInLoading = value
    }
    setLoggedIn(value,) {
        this.loggedIn = value
    }
    setCheckUserStatus(value,) {
        this.checkUserStatus = value
    }

    // login = () =>{
    //    if( this.codeCheck)
    //       this.userSignedIn=true
    //     else
    //         alert("Enter the code")
    //
    // }

    setItemsPerPage= (value) =>{
        this.itemsPerPage = value
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


    login = async () => {
        try {
            this.setLoading(true)
            const response = await UserService.login({
               phone:this.phoneNumber
            })

            console.log('response', response)
            if (response.success===true){
                NavigationService.navigate('Verify Your Number')
            }
            // this.setResponseMessage(response)
            return response.success

        } catch (err) {
            alert('Invalid phone number')
            console.log('login err', err)
            this.handleError(err)
        } finally {
            this.setLoading(false)
        }

    }


    setUserLogin = (api_key, user) => {
            AsyncStorage.setItem('token', api_key.toString())
            AsyncStorage.setItem('phone', this.phoneNumber.toString())
        if (user?.store?.name) {
            AsyncStorage.setItem('userStatus', user.store.name.toString())
            this.setCheckUserStatus(user.store.name)
        }
        // this.setCheckUserStatus(user)
            OpenAPI.TOKEN = api_key;

    }


    confirmOtp = async () => {
        try {
            this.setLoading(true)
            let params = {
                phone: this.phoneNumber,
                code: this.codeCheck,
            }
            // console.log('confirmOtp params', params)

            const response = await UserService.otp(params)
            // console.log('confirmOtp response', response)
            if (response.api_key) {
                // console.log("is it",response.user.store.name)
                // if (response.user?.store?.name)
                    this.setUserLogin(response.api_key, response.user)
                    this.setLoggedIn(true,)
                    return response.user;

            }
        } catch (err) {
            console.log('login err', err.body.message)
            this.handleError(err)
        } finally {
            this.setLoading(false)
        }
    }

    checkIsSignedIn = async () => {
        try {
            this.setCheckIsSignedInLoading(true,)
            this.setLoggedIn(false,)
            let token = await AsyncStorage.getItem('token',)
            let number = await AsyncStorage.getItem('phone',)
            let userStatus = await AsyncStorage.getItem('userStatus',)
            console.log('userStatus', userStatus,)
            // console.log('checkUserIsSignedIn this.loggedIn', this.loggedIn,)


            if (token !== null) {
                OpenAPI.TOKEN = token;
                this.setPhoneNumber(number)
                this.setCheckUserStatus(userStatus)
                this.setLoggedIn(true,)
            } else {
                this.setLoggedIn(false,)
            }
            this.setCheckIsSignedInLoading(false,)

        } catch (err) {
            this.setCheckIsSignedInLoading(false,)
            console.log('isSignedIn() err:', err,)
            console.log('isSignedIn() err.response:', err.response,)

            // // TODO - Evaluate alert and handle it properly
            // if (Stores.mainStore.isConnected) {
            //     alert('Something seems to be wrong, please try again',)
            //     await this.onSignOut()
            // }
        }
    };

    onSignOut = async () => {
        try {
            await AsyncStorage.removeItem('token', )
            await AsyncStorage.removeItem('phone', )
            await AsyncStorage.removeItem('userStatus', )
            this.setLoggedIn(false)
        } catch (err) {
            console.log('onSignOut err', err,)
        }
    }
}


export default AuthStore
