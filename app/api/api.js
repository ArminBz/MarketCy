import { API, } from '../utils/Api'
import { Platform, } from 'react-native'


export const signInApi = async (userNumber) => {
  console.log('API', API,)
  let response = await API.post('', userNumber)
  console.log('codeCheck response', response,)
  return response
}

export const getProductApi = async () => {
  let response = await API.get(``,)
  console.log('products response', response,)
  return response
}

export const getCategoriesApi = async () => {
  let response = await API.get(``,)
  console.log('categories response', response,)
  return response
}

export const getOffersApi = async () => {
  let response = await API.get(``,)
  console.log('offers response', response,)
  return response
}

export const userAddressApi = async (userAddress) => {
  console.log('API', API,)
  let response = await API.post('', userAddress)
  console.log('address response', response,)
  return response
}

export const basketReceiptApi = async (userAddress,selectedProduct) => {
  console.log('API', API,)
  let response = await API.post('', userAddress,selectedProduct)
  console.log('receipt response', response,)
  return response
}



