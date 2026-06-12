import {action, makeObservable, observable} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {OpenAPI, UserService} from '../../../src/services/openapi';
import NavigationService from '../../router/NavigationService';

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

  setPhoneNumber = value => {
    this.phoneNumber = value;
  };

  setCodeCheck = value => {
    this.codeCheck = value;
  };

  setLoading = value => {
    this.loading = value;
  };

  setErrorMessage = value => {
    this.errorMessage = value;
  };

  setShowErrMessage = value => {
    this.showErrMessage = value;
  };

  setConfirmPhone = value => {
    this.confirmPhone = value;
  };

  setResponseMessage = value => {
    this.responseMessage = value;
  };

  setCheckIsSignedInLoading = value => {
    this.checkIsSignedInLoading = value;
  };

  setLoggedIn(value) {
    this.loggedIn = value;
  }

  setCheckUserStatus(value) {
    this.checkUserStatus = value;
  }

  setAddressesOfUser(value) {
    this.addressesOfUser = value;
  }

  setItemsPerPage = value => {
    this.itemsPerPage = value;
  };

  handleError = err => {
    if (err?.body?.message) {
      this.setErrorMessage(err.body.message);
      this.setShowErrMessage(true);
    } else if (err?.message) {
      this.setErrorMessage(err.message);
      this.setShowErrMessage(true);
    }
  };

  login = async () => {
    try {
      this.setLoading(true);
      const response = await UserService.login({
        phone: this.phoneNumber,
      });

      if (response.success === true) {
        NavigationService.navigate('Verify Your Number');
      }
      // this.setResponseMessage(response)
      return response.success;
    } catch (err) {
      alert('Invalid phone number');
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
    } catch (err) {
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

      const response = await UserService.otp(params);

      if (response.api_key) {
        this.setUserLogin(response.api_key, response.user);
        this.checkIsSignedIn();
        this.setLoggedIn(true);
        return response.user;
      }
    } catch (err) {
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
    }
  };

  onSignOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('phone');
      await AsyncStorage.removeItem('userStatus');
      this.setLoggedIn(false);
    } catch (err) {
      // ignore — local sign-out should always succeed
    }
  };
}

export default AuthStore;
