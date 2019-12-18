import axios from 'axios'
import { API_PATH, BODYGRAM_API_KEY, API_HOST } from '@src/appConfig'

const axiosInstance = axios.create({
  baseURL: API_HOST + API_PATH,
  headers: { 'x-api-key': BODYGRAM_API_KEY }
})

export const setToken = (token: string): void => {
  axiosInstance.defaults.headers.common['Authorization'] = token
}

export const removeToken = (): void => {
  delete axiosInstance.defaults.headers.common['Authorization']
}

export default axiosInstance
