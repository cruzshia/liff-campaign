import { isDev } from '@src/appConfig'

const Logger = {
  log: isDev
    ? (...props: any) => {
        console.log(...props)
      }
    : () => {}
}

export default Logger
