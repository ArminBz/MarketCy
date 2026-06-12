import {action, makeObservable, observable} from 'mobx';
import {basketReceiptApi} from '../../api/api';
import {Stores} from '../../store';
import {StoreService} from '../../../src/services/openapi';

class ProductStore {
  constructor() {
    makeObservable(this, {
      quantityOfProduct: observable,
      selectedProducts: observable,
      addProducts: observable,
      loading: observable,
      errorMessage: observable,
      showErrMessage: observable,
      product: observable,
      selectedProductByCat: observable,
      payment: observable,
      selectedCategories: observable,
      page: observable,
      onEndReachedLoading: observable,
      flatListOnReachEnd: observable,
      idMarkets: observable,

      setQuantityOfProduct: action,
      setSelectedProducts: action,
      setAddProducts: action,
      setErrorMessage: action,
      setLoading: action,
      setShowErrMessage: action,
      setProduct: action,
      setPayment: action,
      setSelectedCategories: action,
      setSelectedProductByCat: action,
      setPage: action,
      setOnEndReachedLoading: action,
      setFlatListOnReachEnd: action,
      setIdMarkets: action,
    });
  }

  errorMessage = '';
  loading = false;
  flatListOnReachEnd = false;
  onEndReachedLoading = false;
  page = 1;
  selectedProductByCat = [];
  payment = '';
  product = [];
  showErrMessage = false;
  quantityOfProduct = 0;
  selectedProducts = {};
  addProducts = [];
  selectedCategories = {};
  idMarkets = 0;

  setSelectedProductByCat = value => {
    this.selectedProductByCat = value;
  };
  setIdMarkets = value => {
    this.idMarkets = value;
  };
  setLoading = value => {
    this.loading = value;
  };
  setFlatListOnReachEnd = value => {
    this.flatListOnReachEnd = value;
  };
  setOnEndReachedLoading = value => {
    this.onEndReachedLoading = value;
  };
  setSelectedProducts = value => {
    this.selectedProducts = value;
  };
  setSelectedCategories = value => {
    this.selectedCategories = value;
  };
  setPage = value => {
    this.page = value;
  };

  setQuantityOfProduct = value => {
    this.quantityOfProduct = value;
  };
  setAddProducts = value => {
    this.addProducts.push(value);
  };
  setErrorMessage = value => {
    this.errorMessage = value;
  };
  setShowErrMessage = value => {
    this.showErrMessage = value;
  };
  setPayment = value => {
    this.payment = value;
  };

  setProduct = value => {
    this.product = value;
  };
  orderReceipt = async () => {
    try {
      await basketReceiptApi(
        Stores.userAddressStore.userAddress,
        this.selectedProducts,
        Stores.authStore.phoneNumber,
      );
    } catch (err) {
      this.handleError(err);
    }
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

  getProducts = async (storeId, categoryId, search, lang, page) => {
    try {
      this.setLoading(true);
      const response = await StoreService.getProducts(
        storeId,
        categoryId,
        search,
        lang,
        page,
      );
      if (response.items && response.items.length === 0) {
        this.setFlatListOnReachEnd(false);
        this.setOnEndReachedLoading(false);
      } else {
        this.setFlatListOnReachEnd(true);
      }
      if (this.product.length > 0) {
        this.setProduct([...this.product, ...response.items]);
      } else {
        this.setProduct(response.items);
      }
      this.setOnEndReachedLoading(false);
    } catch (err) {
      this.setOnEndReachedLoading(false);
      this.handleError(err);
    } finally {
      this.setLoading(false);
    }
  };
}

export default ProductStore;
