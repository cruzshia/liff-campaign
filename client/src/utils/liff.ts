import { LIFF_ID } from '../appConfig'

const { liff } = window

export default liff

export function init() {
  if (!LIFF_ID) {
    throw new Error('Set LIFF ID as env var "LIFF_ID"')
  }

  return new Promise((resolve, reject) => {
    liff.init({
      liffId: LIFF_ID
    }).then(() => {
      if (!liff.isLoggedIn()) {
        liff.login()
      }

      resolve()
    }).catch((error: any) => {
      reject(error)
    })
  })
}
