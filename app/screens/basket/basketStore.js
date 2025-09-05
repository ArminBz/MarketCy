import {action, makeObservable, observable} from 'mobx';

import {StoreService} from '../../../src/services/openapi';
import {Alert} from 'react-native';

class basketStore {
  constructor() {
    makeObservable(this, {
      errorMessage: observable,
      showErrMessage: observable,
      basketItems: observable,
      totalPrice: observable,
      loading: observable,
      quantityFromBack: observable,

      setErrorMessage: action,
      setShowErrMessage: action,
      setBasketItems: action,
      setTotalPrice: action,
      setLoading: action,
      setQuantityFromBack: action,
    });
  }

  errorMessage = '';
  showErrMessage = false;
  basketItems = {};
  totalPrice = 0;
  loading = false;
  quantityFromBack = 0;

  setErrorMessage = value => {
    this.errorMessage = value;
  };
  setShowErrMessage = value => {
    this.showErrMessage = value;
  };
  setBasketItems = value => {
    this.basketItems = value;
  };
  setTotalPrice = value => {
    this.totalPrice = value;
  };
  setLoading = value => {
    this.loading = value;
  };
  setQuantityFromBack = value => {
    this.quantityFromBack = value;
  };

  handleError = err => {
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

  getBasket = async () => {
    try {
      this.setLoading(true);
      const response = await StoreService.getBasket(1);
      this.setBasketItems([]);
      this.setBasketItems(response.items);
      this.setTotalPrice(response.total_price);
      this.setQuantityFromBack(response.items.quantity);
    } catch (err) {
      console.log('login err', err);
      this.handleError(err);
    } finally {
      this.setLoading(false);
    }
  };

  updateBasket = async (store_id, product_id, quantity) => {
    try {
      const response = await StoreService.updateBasket(
        store_id,
        product_id,
        quantity,
      );
    } catch (err) {
      console.log('login err', err);
      this.handleError(err);
    }
  };

  deleteBasketItem = async (store_id, product_id) => {
    try {
      this.setLoading(true);
      const response = await StoreService.deleteBasketItem(
        store_id,
        product_id,
      );
      console.log('deleteItemBasket', response);
      // return response
    } catch (err) {
      console.log('login err', err);
      this.handleError(err);
    } finally {
      this.setLoading(false);
    }
  };

  checkOut = async (store_id, address, paymentMethod) => {
    try {
      this.setLoading(true);
      const response = await StoreService.checkout(
        store_id,
        address,
        paymentMethod,
      );
      Alert.alert('Successful', response.message);
    } catch (err) {
      console.log('checkout err', err);
      Alert.alert('Error:', err.message);
      this.handleError(err);
    } finally {
      this.setLoading(false);
    }
  };
}

export default basketStore;
