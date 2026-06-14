import {action, makeObservable, observable} from 'mobx';

import {StoreService} from '../../../src/services/openapi';
import type {ApiError, Category} from '../../types';

class CategoryStore {
  constructor() {
    makeObservable(this, {
      categories: observable,
      errorMessage: observable,
      showErrMessage: observable,
      page: observable,
      onEndReachedLoading: observable,
      flatListOnReachEnd: observable,

      setCategory: action,
      setErrorMessage: action,
      setShowErrMessage: action,
      getCategory: action,
      setPage: action,
      setOnEndReachedLoading: action,
      setFlatListOnReachEnd: action,
    });
  }

  categories: Category[] = [];
  errorMessage = '';
  showErrMessage = false;
  flatListOnReachEnd = false;
  onEndReachedLoading = false;
  page = 1;

  setCategory = (value: Category[]) => {
    this.categories = value;
  };
  setFlatListOnReachEnd = (value: boolean) => {
    this.flatListOnReachEnd = value;
  };
  setOnEndReachedLoading = (value: boolean) => {
    this.onEndReachedLoading = value;
  };
  setPage = (value: number) => {
    this.page = value;
  };
  setErrorMessage = (value: string) => {
    this.errorMessage = value;
  };
  setShowErrMessage = (value: boolean) => {
    this.showErrMessage = value;
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

  getCategory = async () => {
    try {
      const response = await StoreService.getCategories(undefined, this.page);
      const items = response.items ?? [];

      if (items.length === 0) {
        this.setFlatListOnReachEnd(false);
        this.setOnEndReachedLoading(false);
      } else {
        this.setFlatListOnReachEnd(true);
      }
      if (this.categories.length > 0) {
        this.setCategory([...this.categories, ...items]);
      } else {
        this.setCategory(items);
      }
    } catch (err) {
      this.setOnEndReachedLoading(false);
      this.handleError(err as ApiError);
    }
  };
}

export default CategoryStore;
