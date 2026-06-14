import WorkerStore from './workerStore';
import {StoreService} from '../../../src/services/openapi';

jest.mock('../../../src/services/openapi', () => ({
  StoreService: {
    adminGetProduct: jest.fn(),
    adminCreateProduct: jest.fn(),
    adminGetOrders: jest.fn(),
    adminUpdateOrderStatus: jest.fn(),
  },
}));

const adminGetProduct = StoreService.adminGetProduct as jest.Mock;
const adminCreateProduct = StoreService.adminCreateProduct as jest.Mock;
const adminGetOrders = StoreService.adminGetOrders as jest.Mock;

describe('WorkerStore', () => {
  beforeEach(() => jest.clearAllMocks());

  it('loads a scanned product and exposes its prices as editable strings', async () => {
    adminGetProduct.mockResolvedValue({
      name: 'Fresh Milk',
      price: 25,
      discount_price: 19,
    });
    const store = new WorkerStore();
    await store.getProductByBarcode('8690000000001');
    expect(store.searchResult.name).toBe('Fresh Milk');
    expect(store.priceProduct).toBe('25');
    expect(store.discountPriceProduct).toBe('19');
    expect(store.loading).toBe(false);
  });

  it('sends numeric prices to the API even though the form holds strings', async () => {
    adminCreateProduct.mockResolvedValue({message: 'ok'});
    const store = new WorkerStore();
    await store.adminCreateProduct('8690000000001', '25', '19', true);
    expect(adminCreateProduct).toHaveBeenCalledWith({
      barcode: 8690000000001,
      price: 25,
      discount_price: 19,
      available: true,
    });
  });

  it('loads pending orders into observable state', async () => {
    adminGetOrders.mockResolvedValue([{id: 1, status: 'pending'}]);
    const store = new WorkerStore();
    await store.getAdminPendingOrders();
    expect(adminGetOrders).toHaveBeenCalledWith('pending');
    expect(store.pendingOrders).toEqual([{id: 1, status: 'pending'}]);
  });
});
