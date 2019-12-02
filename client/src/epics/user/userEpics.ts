import { ActionsObservable, ofType } from 'redux-observable'
import { catchError, mergeMap, exhaustMap } from 'rxjs/operators'
import { UserActionTypes, setLoginResult } from '@reducer/user/actions'
import { initBodyGramAct } from '@reducer/bodygram/actions'

import { LIFF_ID } from '@src/appConfig'
import { setToken } from '@src/utils/ajax'
import { isDev } from '@src/appConfig'
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
        mergeMap(() => {
          if (!window.liff.isLoggedIn()) {
            window.liff.login()
            return of(setLoginResult())
          } else {
            const token = window.liff.getAccessToken()
            setToken(isDev ? 'dev_token' : token)
            return of(setLoginResult(token), initBodyGramAct())
          }
        }),
        catchError(() => of(setLoginResult()))
      )
    )
  )

export default [userLineLoginEpic]
