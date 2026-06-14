import BasketStore from './basketStore';
import {StoreService} from '../../../src/services/openapi';

jest.mock('../../../src/services/openapi', () => ({
  StoreService: {
    getBasket: jest.fn(),
    updateBasket: jest.fn(),
    deleteBasketItem: jest.fn(),
    checkout: jest.fn(),
  },
}));

const getBasket = StoreService.getBasket as jest.Mock;

describe('BasketStore', () => {
  beforeEach(() => jest.clearAllMocks());

  it('updates observable state through its actions', () => {
    const store = new BasketStore();
    store.setTotalPrice(158);
    store.setLoading(true);
    expect(store.totalPrice).toBe(158);
    expect(store.loading).toBe(true);
  });

  it('surfaces an API error message via handleError', () => {
    const store = new BasketStore();
    store.handleError({body: {message: 'Out of stock'}});
    expect(store.errorMessage).toBe('Out of stock');
    expect(store.showErrMessage).toBe(true);
  });

  it('loads items and total from the API and clears loading', async () => {
    getBasket.mockResolvedValue({items: [{id: 1}, {id: 2}], total_price: 99});
    const store = new BasketStore();
    await store.getBasket();
    expect(getBasket).toHaveBeenCalledWith(1);
    expect(store.basketItems).toEqual([{id: 1}, {id: 2}]);
    expect(store.totalPrice).toBe(99);
    expect(store.loading).toBe(false);
  });

  it('handles a failed request without throwing', async () => {
    getBasket.mockRejectedValue({message: 'network down'});
    const store = new BasketStore();
    await expect(store.getBasket()).resolves.toBeUndefined();
    expect(store.errorMessage).toBe('network down');
    expect(store.loading).toBe(false);
  });
});
