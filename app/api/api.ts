import {API} from '../utils/Api';

export const signInApi = async (phone: object) => {
  const response = await API.post('/users/login', phone);
  return response;
};

export const getProductApi = async () => {
  const response = await API.get('');
  return response;
};

export const getCategoriesApi = async () => {
  const response = await API.get('');
  return response;
};

export const getOffersApi = async () => {
  const response = await API.get('');
  return response;
};

export const userAddressApi = async (userAddress: object) => {
  const response = await API.post('', userAddress);
  return response;
};

export const basketReceiptApi = async (
  userAddress: string,
  selectedProduct: object,
  userNumber: string,
) => {
  const response = await API.post('', {
    userAddress,
    selectedProduct,
    userNumber,
  });
  return response;
};
