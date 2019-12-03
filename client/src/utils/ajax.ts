import axios from 'axios'
import { API_PATH } from '@src/appConfig'

const axiosInstance = axios.create({
  baseURL: API_PATH
})

export const setToken = (token: string): void => {
  axiosInstance.defaults.headers['token'] = token
  axiosInstance.defaults.headers['Authorization'] = token
}

export const removeToken = (): void => {
  delete axiosInstance.defaults.headers['token']
  delete axiosInstance.defaults.headers['Authorization']
}

export default axiosInstance
