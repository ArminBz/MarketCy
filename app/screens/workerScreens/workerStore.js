import {action, makeObservable, observable} from 'mobx';
import {StoreService} from '../../../src/services/openapi';
import {Alert} from 'react-native';

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
  searchResult = {};
  priceToString = '';
  discountPriceToString = '';
  pendingOrders = {};
  selectedOrderProducts = {};
  orderID = {};
  priceProduct = 0;
  discountPriceProduct = 0;
  acceptedOrders = {};
  rejectedOrders = {};
  deliveredOrders = {};

  setErrorMessage = value => {
    this.errorMessage = value;
  };
  setDeliveredOrders = value => {
    this.deliveredOrders = value;
  };
  setRejectedOrders = value => {
    this.rejectedOrders = value;
  };
  setDiscountPriceProduct = value => {
    this.discountPriceProduct = value;
  };
  setPriceProduct = value => {
    this.priceProduct = value;
  };
  setOrderID = value => {
    this.orderID = value;
  };
  setSelectedOrderProducts = value => {
    this.selectedOrderProducts = value;
  };
  setShowErrMessage = value => {
    this.showErrMessage = value;
  };
  setLoading = value => {
    this.loading = value;
  };
  setSearchResult = value => {
    this.searchResult = value;
  };
  setPriceToString = value => {
    this.priceToString = value;
  };
  setDiscountPriceToString = value => {
    this.discountPriceToString = value;
  };
  setPendingOrders = value => {
    this.pendingOrders = value;
  };
  setAcceptedOrders = value => {
    this.acceptedOrders = value;
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

  getProductByBarcode = async barCode => {
    try {
      this.setLoading(true);
      const response = await StoreService.adminGetProduct(barCode);
      this.setSearchResult({});
      this.setSearchResult(response);
      this.setPriceProduct(response.price);
      this.setDiscountPriceProduct(response.discount_price);
      this.setPriceToString(response.price.toString());
      this.setDiscountPriceToString(response.discount_price.toString());
    } catch (err) {
      this.handleError(err);
    } finally {
      this.setLoading(false);
    }
  };

  adminCreateProduct = async (barCode, price, discount_price, available) => {
    try {
      this.setLoading(true);
      const response = await StoreService.adminCreateProduct({
        barcode: barCode,
        price: price,
        discount_price: discount_price,
        available: available,
      });
      Alert.alert('Successful', response.message);
    } catch (err) {
      Alert.alert('Error:', err.message);
      this.handleError(err);
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
      this.handleError(err);
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
      this.handleError(err);
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
      this.handleError(err);
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
      this.handleError(err);
    } finally {
      this.setLoading(false);
    }
  };

  adminUpdateOrderStatus = async (orderId, status) => {
    try {
      this.setLoading(true);
      const response = await StoreService.adminUpdateOrderStatus(
        orderId,
        status,
      );
      Alert.alert('Successful', response.message);
    } catch (err) {
      Alert.alert('Error:', err.message);
      this.handleError(err);
    } finally {
      this.setLoading(false);
    }
  };
}

export default WorkerStore;
