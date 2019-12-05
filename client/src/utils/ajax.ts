import axios from 'axios'
import { API_PATH } from '@src/appConfig'

const axiosInstance = axios.create({
  baseURL: API_PATH
})

export const setToken = (token: string): void => {
  axiosInstance.defaults.headers.common['Authorization'] = token
}

export const removeToken = (): void => {
  delete axiosInstance.defaults.headers.common['Authorization']
}

export default axiosInstance
