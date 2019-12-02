import { ActionsObservable, ofType } from 'redux-observable'
import { catchError, map, exhaustMap } from 'rxjs/operators'
import { UserActionTypes, setLoginResult } from '@reducer/user/actions'

import { LIFF_ID } from '@src/appConfig'
import { of, from } from 'rxjs'

const userLineLoginEpic = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(UserActionTypes.LOGIN),
    exhaustMap(() =>
      from(
        window.liff.init({
          liffId: LIFF_ID
        })
      ).pipe(
        map(() => {
          if (!window.liff.isLoggedIn()) {
            window.liff.login()
            return setLoginResult()
          } else {
            return setLoginResult(window.liff.getAccessToken())
          }
        }),
        catchError(() => of(setLoginResult()))
      )
    )
  )

export default [userLineLoginEpic]
