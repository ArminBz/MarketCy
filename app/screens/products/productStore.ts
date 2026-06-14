import {action, makeObservable, observable} from 'mobx';
import {basketReceiptApi} from '../../api/api';
import {Stores} from '../../store';
import {StoreService} from '../../../src/services/openapi';
import type {ApiError, BasketItem, Category, StoreProduct} from '../../types';

type CartProduct = StoreProduct & {quantityOfProduct?: number};

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
  selectedProductByCat: StoreProduct[] = [];
  payment = '';
  product: StoreProduct[] = [];
  showErrMessage = false;
  quantityOfProduct = 0;
  // Set as a StoreProduct from the catalogue and as a BasketItem from the
  // basket; each consuming modal narrows it to the shape it expects.
  selectedProducts: StoreProduct | BasketItem = {} as StoreProduct;
  addProducts: CartProduct[] = [];
  selectedCategories: Partial<Category> = {};
  idMarkets = 0;

  setSelectedProductByCat = (value: StoreProduct[]) => {
    this.selectedProductByCat = value;
  };
  setIdMarkets = (value: number) => {
    this.idMarkets = value;
  };
  setLoading = (value: boolean) => {
    this.loading = value;
  };
  setFlatListOnReachEnd = (value: boolean) => {
    this.flatListOnReachEnd = value;
  };
  setOnEndReachedLoading = (value: boolean) => {
    this.onEndReachedLoading = value;
  };
  setSelectedProducts = (value: StoreProduct | BasketItem) => {
    this.selectedProducts = value;
  };
  setSelectedCategories = (value: Partial<Category>) => {
    this.selectedCategories = value;
  };
  setPage = (value: number) => {
    this.page = value;
  };

  setQuantityOfProduct = (value: number) => {
    this.quantityOfProduct = value;
  };
  setAddProducts = (value: CartProduct) => {
    this.addProducts.push(value);
  };
  setErrorMessage = (value: string) => {
    this.errorMessage = value;
  };
  setShowErrMessage = (value: boolean) => {
    this.showErrMessage = value;
  };
  setPayment = (value: string) => {
    this.payment = value;
  };

  setProduct = (value: StoreProduct[]) => {
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
      this.handleError(err as ApiError);
    }
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

  getProducts = async (
    storeId: number,
    categoryId?: number | null,
    search?: string | null,
    lang?: string | null,
    page?: number | null,
  ) => {
    try {
      this.setLoading(true);
      const response = await StoreService.getProducts(
        storeId,
        categoryId ?? undefined,
        search ?? undefined,
        lang ?? undefined,
        page ?? undefined,
      );
      const items = response.items ?? [];
      if (items.length === 0) {
        this.setFlatListOnReachEnd(false);
        this.setOnEndReachedLoading(false);
      } else {
        this.setFlatListOnReachEnd(true);
      }
      if (this.product.length > 0) {
        this.setProduct([...this.product, ...items]);
      } else {
        this.setProduct(items);
      }
      this.setOnEndReachedLoading(false);
    } catch (err) {
      this.setOnEndReachedLoading(false);
      this.handleError(err as ApiError);
    } finally {
      this.setLoading(false);
    }
  };
}

export default ProductStore;
