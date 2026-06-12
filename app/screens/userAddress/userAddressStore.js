import {action, makeObservable, observable} from 'mobx';
import {UserService} from '../../../src/services/openapi';
import {Alert} from 'react-native';

class UserAddressStore {
  constructor() {
    makeObservable(this, {
      errorMessage: observable,
      showErrMessage: observable,
      loading: observable,

      setUserAddress: action,
      setErrorMessage: action,
      setShowErrMessage: action,
      setLoading: action,
    });
  }

  userAddress = '';
  errorMessage = '';
  showErrMessage = false;
  loading = false;

  setErrorMessage = value => {
    this.errorMessage = value;
  };
  setShowErrMessage = value => {
    this.showErrMessage = value;
  };
  setLoading = value => {
    this.loading = value;
  };
  setUserAddress = value => {
    this.userAddress = value;
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

  addAddresses = async () => {
    try {
      this.setLoading(true);
      const response = await UserService.addAddress({
        address: this.userAddress,
      });
      if (response) {
        Alert.alert('Address added successfully');
      }
    } catch (err) {
      Alert.alert('Error:', err.message);
      this.handleError(err);
    } finally {
      this.setLoading(false);
    }
  };

  deleteAddresses = async index => {
    try {
      this.setLoading(true);
      const response = await UserService.deleteAddress(index);
      if (response) {
        alert('Address deleted successfully');
      }
    } catch (err) {
      this.handleError(err);
    } finally {
      this.setLoading(false);
    }
  };
}

export default UserAddressStore;
