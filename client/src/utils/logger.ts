import { isDev } from '@src/appConfig'

const isLoggerEnable = isDev || localStorage.getItem('__lh_debug__') === 'true'

const Logger = {
  info: (...props: any) =>
    console.log('%c KAO info: ', 'color: #1c69d2', ...props),
  log: (...props: any) =>
    console.log('%c KAO logger: ', 'color: #bada55', ...props),
  error: (...props: any) =>
    console.error('%c KAO error: ', 'color: #e51919', ...props)
}

export default isLoggerEnable
  ? Logger
  : { log: () => {}, error: () => {}, info: () => {} }
