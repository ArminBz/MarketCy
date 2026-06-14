import {action, makeObservable, observable} from 'mobx';

import {StoreService} from '../../../src/services/openapi';
import {Alert} from 'react-native';
import type {ApiError, BasketItem} from '../../types';

class BasketStore {
  constructor() {
    makeObservable(this, {
      errorMessage: observable,
      showErrMessage: observable,
      basketItems: observable,
      totalPrice: observable,
      loading: observable,

      setErrorMessage: action,
      setShowErrMessage: action,
      setBasketItems: action,
      setTotalPrice: action,
      setLoading: action,
    });
  }

  errorMessage = '';
  showErrMessage = false;
  basketItems: BasketItem[] = [];
  totalPrice = 0;
  loading = false;

  setErrorMessage = (value: string) => {
    this.errorMessage = value;
  };
  setShowErrMessage = (value: boolean) => {
    this.showErrMessage = value;
  };
  setBasketItems = (value: BasketItem[]) => {
    this.basketItems = value;
  };
  setTotalPrice = (value: number) => {
    this.totalPrice = value;
  };
  setLoading = (value: boolean) => {
    this.loading = value;
  };

  handleError = (err: ApiError) => {
    if (err?.body?.message) {
      this.setErrorMessage(err.body.message);
      this.setShowErrMessage(true);
    } else if (err?.message) {
      this.setErrorMessage(err.message);
      this.setShowErrMessage(true);
    }
  };

  getBasket = async () => {
    try {
      this.setLoading(true);
      const response = await StoreService.getBasket(1);
      this.setBasketItems(response.items ?? []);
      this.setTotalPrice(response.total_price ?? 0);
    } catch (err) {
      this.handleError(err as ApiError);
    } finally {
      this.setLoading(false);
    }
  };

  updateBasket = async (
    store_id: number,
    product_id: number,
    quantity: number,
  ) => {
    try {
      await StoreService.updateBasket(store_id, product_id, quantity);
    } catch (err) {
      this.handleError(err as ApiError);
    }
  };

  deleteBasketItem = async (store_id: number, product_id: number) => {
    try {
      this.setLoading(true);
      await StoreService.deleteBasketItem(store_id, product_id);
    } catch (err) {
      this.handleError(err as ApiError);
    } finally {
      this.setLoading(false);
    }
  };

  checkOut = async (
    store_id: number,
    address: string,
    paymentMethod: string,
  ) => {
    try {
      this.setLoading(true);
      const response = await StoreService.checkout(
        store_id,
        address,
        paymentMethod,
      );
      Alert.alert('Successful', response.message);
    } catch (err) {
      Alert.alert('Error:', (err as ApiError).message);
      this.handleError(err as ApiError);
    } finally {
      this.setLoading(false);
    }
  };
}

export default BasketStore;
