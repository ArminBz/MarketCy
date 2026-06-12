import {API} from '../utils/Api';

export const signInApi = async phone => {
  let response = await API.post('/users/login', phone);
  return response;
};

export const getProductApi = async () => {
  let response = await API.get('');
  return response;
};

export const getCategoriesApi = async () => {
  let response = await API.get('');
  return response;
};

export const getOffersApi = async () => {
  let response = await API.get('');
  return response;
};

export const userAddressApi = async userAddress => {
  let response = await API.post('', userAddress);
  return response;
};

export const basketReceiptApi = async (
  userAddress,
  selectedProduct,
  userNumber,
) => {
  let response = await API.post('', userAddress, selectedProduct, userNumber);
  return response;
};
