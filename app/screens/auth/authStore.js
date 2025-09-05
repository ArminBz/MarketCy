
import {
  action, makeObservable, observable,
} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OpenAPI, UserService } from "../../../src/services/openapi";
import NavigationService from "../../router/NavigationService";


class AuthStore {
  constructor() {
    makeObservable(this, {
      phoneNumber: observable,
      codeCheck: observable,
      userSignedIn: observable,
      itemsPerPage: observable,
      loading: observable,
      errorMessage: observable,
      showErrMessage: observable,
      confirmPhone: observable,
      responseMessage: observable,
      checkIsSignedInLoading: observable,
      loggedIn: observable,
      checkUserStatus: observable,
      addressesOfUser: observable,

      setPhoneNumber: action,
      setCodeCheck: action,
      login: action,
      setItemsPerPage: action,
      setLoading: action,
      setErrorMessage: action,
      setShowErrMessage: action,
      setConfirmPhone: action,
      setResponseMessage: action,
      checkIsSignedIn: action,
      setCheckIsSignedInLoading: action,
      setLoggedIn: action,
      onSignOut: action,
      setCheckUserStatus: action,
      setAddressesOfUser: action,
    });
  }


  phoneNumber = '';
  codeCheck = '';
  userSignedIn = false;
  itemsPerPage = 0;
  loading = false;
  errorMessage = '';
  showErrMessage = false;
  confirmPhone = 0;
  responseMessage = '';
  checkIsSignedInLoading = false;
  loggedIn = false;
  checkUserStatus = null;
  addressesOfUser = [];


  setPhoneNumber = (value) => {
    this.phoneNumber = value;
  };

  setCodeCheck = (value) => {
    this.codeCheck = value;
  };

  setLoading = (value) => {
    this.loading = value;
  };

  setErrorMessage = (value) => {
    this.errorMessage = value;
  };

  setShowErrMessage = (value) => {
    this.showErrMessage = value;
  };

  setConfirmPhone = (value) => {
    this.confirmPhone = value;
  };

  setResponseMessage = (value) => {
    this.responseMessage = value;
  };

  setCheckIsSignedInLoading = (value) => {
    this.checkIsSignedInLoading = value;
  };

  setLoggedIn(value) {
    this.loggedIn = value;
  };

  setCheckUserStatus(value) {
    this.checkUserStatus = value;
  };

  setAddressesOfUser(value) {
    this.addressesOfUser = value;
  };

  setItemsPerPage = (value) => {
    this.itemsPerPage = value;
  };


  handleError = (err) => {
    if (err?.body?.message) {
      this.setErrorMessage(err.body.message);
      this.setShowErrMessage(true);
      console.log('handleError err', err.body.message);
    } else if (err?.message) {
      this.setErrorMessage(err.message);
      this.setShowErrMessage(true);
      console.log('handleError err', err.message);
    }
  };


  login = async () => {
    try {
      this.setLoading(true);
      const response = await UserService.login({
        phone: this.phoneNumber
      });

      console.log('response', response);
      if (response.success === true) {
        NavigationService.navigate('Verify Your Number');
      }
      // this.setResponseMessage(response)
      return response.success;
    } catch (err) {
      alert('Invalid phone number');
      console.log('login err', err);
      this.handleError(err);
    } finally {
      this.setLoading(false);
    }
  };


  setUserLogin = (api_key, user) => {
    AsyncStorage.setItem('token', api_key.toString());
    AsyncStorage.setItem('phone', this.phoneNumber.toString());
    if (user?.store?.name) {
      AsyncStorage.setItem('userStatus', user.store.name.toString());
      this.setCheckUserStatus(user.store.name);
    }
    // this.setCheckUserStatus(user)
    OpenAPI.TOKEN = api_key;
  };


  getUser = async () => {
    try {
      const response = await UserService.getMe();
      if (response.addresses !== null) {
        this.setAddressesOfUser(response.addresses);
      }
      console.log('get user response', this.addressesOfUser);
    } catch (err) {
      console.log('get user err', err.body.message);
      this.handleError(err);
    } finally {
      this.setLoading(false);
    }
  };


  confirmOtp = async () => {
    try {
      this.setLoading(true);
      let params = {
        phone: this.phoneNumber,
        code: this.codeCheck,
      };
      // console.log('confirmOtp params', params)

      const response = await UserService.otp(params);
      // console.log('confirmOtp response', response.user)

      if (response.api_key) {
        this.setUserLogin(response.api_key, response.user);
        this.checkIsSignedIn();
        this.setLoggedIn(true);
        return response.user;
      }
    } catch (err) {
      console.log('login err', err.body.message);
      this.handleError(err);
    } finally {
      this.setLoading(false);
    }
  };

  checkIsSignedIn = async () => {
    try {
      this.setCheckIsSignedInLoading(true);
      this.setLoggedIn(false);
      let token = await AsyncStorage.getItem('token');
      let number = await AsyncStorage.getItem('phone');
      let userStatus = await AsyncStorage.getItem('userStatus');
      console.log('userStatus', userStatus);

      if (token !== null) {
        OpenAPI.TOKEN = token;
        this.setPhoneNumber(number);
        this.setCheckUserStatus(userStatus);
        this.setLoggedIn(true);
      } else {
        this.setLoggedIn(false);
      }
      this.setCheckIsSignedInLoading(false);
    } catch (err) {
      this.setCheckIsSignedInLoading(false);
      console.log('isSignedIn() err:', err);
      console.log('isSignedIn() err.response:', err.response);
    }
  };

  onSignOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('phone');
      await AsyncStorage.removeItem('userStatus');
      this.setLoggedIn(false);
    } catch (err) {
      console.log('onSignOut err', err);
    }
  };
}

export default AuthStore;
