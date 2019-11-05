import i18n from '../locale'
import { AppConfig } from '../models/appConfig'

export const animateCorPoint = (value: number) => {
  const percentage = Math.floor(232 * (value * 0.01))
  return `${percentage}, 232`
}

export const numberWithCommas = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const dateText = (date: Date): string => {
  return (
    date.getFullYear().toString() +
    i18n.common.year +
    (date.getMonth() + 1).toString() +
    i18n.common.month +
    date.getDate().toString() +
    i18n.common.date
  )
}

export const dateForInputValue = (date: Date): string => {
  const yyyy = date.getFullYear()
  const mm = (date.getMonth() + 1).toString().padStart(2, '0')
  const dd = date
    .getDate()
    .toString()
    .padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export const priceWithTax = (price: number, appConfig: AppConfig): number => {
  return Math.floor(price * appConfig.taxRate)
}

export const priceRangeToPrice = (priceRange: string, appConfig: AppConfig): number => {
  const { image } = appConfig
  return image.priceRanges.filter(item => item.name === priceRange)[0].value
}

export const priceRangeToPriceWithTax = (priceRange: string, appConfig: AppConfig): number => {
  const { taxRate } = appConfig
  return Math.floor(priceRangeToPrice(priceRange, appConfig) * taxRate)
}

export const digitsArrToPercentage = (arr: ReadonlyArray<number> | null): ReadonlyArray<number> =>
  arr ? arr.map((el: number) => el * 100) : []

export const digitsToPercentage = (digits: number): string => `${Math.round(digits * 100)}%`

export const toUnderscored = (text: string): string =>
  text.replace(/\.?([A-Z])/g, (x: string, y: string) => `_${y.toLowerCase().replace(/^_/, '')}`)

export const toCamelCased = (text: string): string => text.replace(/_([a-z])/g, (x: string) => x[1].toUpperCase())
export const kebabToCamelCased = (text: string): string => text.replace(/-([a-z])/g, (x: string) => x[1].toUpperCase())
