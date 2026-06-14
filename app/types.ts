// Central app types. Domain shapes are reused from the generated OpenAPI client
// so the app and the API stay in lock-step; navigation params live here too.
export type {
  ProductSchema as Product,
  StoreProductSchema as StoreProduct,
  BasketSchema as Basket,
  BasketItemSchema as BasketItem,
  OrderSchema as Order,
  OrderItemSchema as OrderItem,
  UserSchema as User,
  CategorySchema as Category,
  StoreSchema as Store,
} from '../src/services/openapi';

// Shape of errors thrown by the generated API client (and our axios helpers).
export type ApiError = {
  body?: {message?: string};
  message?: string;
  response?: unknown;
};

// Route params for the app's stacks. Screens that read `route.params` use these.
export type RootStackParamList = {
  Login: undefined;
  'Verify Your Number': undefined;
  'CY.market': undefined;
  'CY.market.admin': undefined;
  ListOfProducts: undefined;
  Offer: undefined;
  Markets: undefined;
  Basket: undefined;
  ModalEachProduct: {name?: string} | undefined;
  ModalUserAddress: {name?: string} | undefined;
  ModalReceiveOrder: {name?: string} | undefined;
  ModalEachProductsFromBasket: undefined;
  ModalOrderProducts: undefined;
};
