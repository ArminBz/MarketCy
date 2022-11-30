import axios from 'axios'
import config from '../config/env/config'

axios.defaults.timeout = 20000
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'
axios.defaults.headers.delete['Content-Type'] = 'application/json'

export function resetToken() {
  delete API.defaults.headers.common['Authorization']
}

export function setToken(token,) {
  API.defaults.headers.common['Authorization'] = token
}

export const API = axios.create({
  baseURL: config.host + '/api/v1',
},)
