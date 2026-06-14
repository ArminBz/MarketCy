import {action, makeObservable, observable} from 'mobx';
import {StoreService} from '../../../src/services/openapi';
import {Alert} from 'react-native';
import type {ApiError, Order, Product} from '../../types';

class WorkerStore {
  constructor() {
    makeObservable(this, {
      errorMessage: observable,
      showErrMessage: observable,
      loading: observable,
      searchResult: observable,
      priceToString: observable,
      discountPriceToString: observable,
      pendingOrders: observable,
      selectedOrderProducts: observable,
      orderID: observable,
      priceProduct: observable,
      discountPriceProduct: observable,
      acceptedOrders: observable,
      rejectedOrders: observable,
      deliveredOrders: observable,

      setErrorMessage: action,
      setShowErrMessage: action,
      setLoading: action,
      setSearchResult: action,
      setPriceToString: action,
      setDiscountPriceToString: action,
      setPendingOrders: action,
      setSelectedOrderProducts: action,
      setOrderID: action,
      setPriceProduct: action,
      setDiscountPriceProduct: action,
      setAcceptedOrders: action,
      setRejectedOrders: action,
      setDeliveredOrders: action,
    });
  }

  errorMessage = '';
  showErrMessage = false;
  loading = false;
  searchResult: Product = {} as Product;
  priceToString = '';
  discountPriceToString = '';
  pendingOrders: Order[] = [];
  selectedOrderProducts: Order = {} as Order;
  orderID: Partial<Order> = {};
  priceProduct = '';
  discountPriceProduct = '';
  acceptedOrders: Order[] = [];
  rejectedOrders: Order[] = [];
  deliveredOrders: Order[] = [];

  setErrorMessage = (value: string) => {
    this.errorMessage = value;
  };
  setDeliveredOrders = (value: Order[]) => {
    this.deliveredOrders = value;
  };
  setRejectedOrders = (value: Order[]) => {
    this.rejectedOrders = value;
  };
  setDiscountPriceProduct = (value: string) => {
    this.discountPriceProduct = value;
  };
  setPriceProduct = (value: string) => {
    this.priceProduct = value;
  };
  setOrderID = (value: Partial<Order>) => {
    this.orderID = value;
  };
  setSelectedOrderProducts = (value: Order) => {
    this.selectedOrderProducts = value;
  };
  setShowErrMessage = (value: boolean) => {
    this.showErrMessage = value;
  };
  setLoading = (value: boolean) => {
    this.loading = value;
  };
  setSearchResult = (value: Product) => {
    this.searchResult = value;
  };
  setPriceToString = (value: string) => {
    this.priceToString = value;
  };
  setDiscountPriceToString = (value: string) => {
    this.discountPriceToString = value;
  };
  setPendingOrders = (value: Order[]) => {
    this.pendingOrders = value;
  };
  setAcceptedOrders = (value: Order[]) => {
    this.acceptedOrders = value;
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

  getProductByBarcode = async (barCode: string) => {
    try {
      this.setLoading(true);
      const response = await StoreService.adminGetProduct(barCode);
      this.setSearchResult(response);
      this.setPriceProduct(response.price?.toString() ?? '');
      this.setDiscountPriceProduct(response.discount_price?.toString() ?? '');
      this.setPriceToString(response.price?.toString() ?? '');
      this.setDiscountPriceToString(response.discount_price?.toString() ?? '');
    } catch (err) {
      this.handleError(err as ApiError);
    } finally {
      this.setLoading(false);
    }
  };

  adminCreateProduct = async (
    barCode: string,
    price: string,
    discount_price: string,
    available: boolean,
  ) => {
    try {
      this.setLoading(true);
      const response = await StoreService.adminCreateProduct({
        barcode: Number(barCode),
        price: Number(price),
        discount_price: Number(discount_price),
        available: available,
      });
      Alert.alert('Successful', response.message);
    } catch (err) {
      Alert.alert('Error:', (err as ApiError).message);
      this.handleError(err as ApiError);
    } finally {
      this.setLoading(false);
    }
  };

  getAdminPendingOrders = async () => {
    try {
      this.setLoading(true);
      const response = await StoreService.adminGetOrders('pending');
      this.setPendingOrders(response);
    } catch (err) {
      this.handleError(err as ApiError);
    } finally {
      this.setLoading(false);
    }
  };

  getAdminAcceptOrders = async () => {
    try {
      this.setLoading(true);
      const response = await StoreService.adminGetOrders('accepted');
      this.setAcceptedOrders(response);
    } catch (err) {
      this.handleError(err as ApiError);
    } finally {
      this.setLoading(false);
    }
  };

  getAdminRejectedOrders = async () => {
    try {
      this.setLoading(true);
      const response = await StoreService.adminGetOrders('rejected');
      this.setRejectedOrders(response);
    } catch (err) {
      this.handleError(err as ApiError);
    } finally {
      this.setLoading(false);
    }
  };

  getAdminDeliveredOrders = async () => {
    try {
      this.setLoading(true);
      const response = await StoreService.adminGetOrders('delivered');
      this.setDeliveredOrders(response);
    } catch (err) {
      this.handleError(err as ApiError);
    } finally {
      this.setLoading(false);
    }
  };

  adminUpdateOrderStatus = async (orderId: number, status: string) => {
    try {
      this.setLoading(true);
      const response = await StoreService.adminUpdateOrderStatus(
        orderId,
        status,
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

export default WorkerStore;
