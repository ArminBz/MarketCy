import ProductStore from './productStore';
import {StoreService} from '../../../src/services/openapi';

jest.mock('../../store', () => ({Stores: {}}));
jest.mock('../../api/api', () => ({basketReceiptApi: jest.fn()}));
jest.mock('../../../src/services/openapi', () => ({
  StoreService: {getProducts: jest.fn()},
}));

const getProducts = StoreService.getProducts as jest.Mock;

describe('ProductStore', () => {
  beforeEach(() => jest.clearAllMocks());

  it('replaces the list on the first page and flags more-to-load', async () => {
    getProducts.mockResolvedValue({items: [{id: 1}, {id: 2}]});
    const store = new ProductStore();
    await store.getProducts(1);
    expect(getProducts).toHaveBeenCalled();
    expect(store.product).toEqual([{id: 1}, {id: 2}]);
    expect(store.flatListOnReachEnd).toBe(true);
    expect(store.loading).toBe(false);
  });

  it('appends results on subsequent pages instead of replacing', async () => {
    const store = new ProductStore();
    store.setProduct([{id: 1}] as never);
    getProducts.mockResolvedValue({items: [{id: 2}]});
    await store.getProducts(1, null, null, null, 2);
    expect(store.product).toEqual([{id: 1}, {id: 2}]);
  });

  it('stops the infinite-scroll spinner when a page comes back empty', async () => {
    getProducts.mockResolvedValue({items: []});
    const store = new ProductStore();
    await store.getProducts(1);
    expect(store.flatListOnReachEnd).toBe(false);
    expect(store.onEndReachedLoading).toBe(false);
  });

  it('surfaces an error message and stops loading on failure', async () => {
    getProducts.mockRejectedValue({message: 'request failed'});
    const store = new ProductStore();
    await store.getProducts(1);
    expect(store.errorMessage).toBe('request failed');
    expect(store.loading).toBe(false);
  });
});
