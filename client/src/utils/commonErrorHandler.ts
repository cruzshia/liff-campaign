import { Dispatch } from 'redux'

import { HttpResponse } from './http'

const handler = (res: HttpResponse<any>, dispatch: Dispatch, f: () => void, onHandled?: () => void) => {
  if (res.status === 401) {
    window.localStorage.removeItem('session')
    if (onHandled) onHandled()
  } else {
    f()
  }
}

export default handler

export const commonErrorHandlerPromisified = (res: HttpResponse<any>, dispatch: Dispatch): Promise<any> =>
  new Promise((resolve, reject) => {
    handler(res, dispatch, resolve, reject)
  })
