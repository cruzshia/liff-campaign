import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { catchError, map, mergeMap, exhaustMap } from 'rxjs/operators'
import {
  UserActionTypes,
  setLoginResult,
  getUserProfileAct
} from '@reducer/user/actions'
import { initBodyGramAct } from '@reducer/bodygram/actions'

import { LIFF_ID } from '@src/appConfig'
import { setToken } from '@src/utils/ajax'
import * as UserService from './userService'
import { isDev } from '@src/appConfig'
import { of, from } from 'rxjs'

const userLineLoginEpic = (action$: ActionsObservable<AnyAction>) =>
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
            return of(
              setLoginResult(token),
              getUserProfileAct(),
              initBodyGramAct()
            )
          }
        }),
        catchError(() => of(setLoginResult()))
      )
    )
  )

export const getUserInfoEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(UserActionTypes.LOGIN),
    exhaustMap(() =>
      from(UserService.getUserAjax()).pipe(
        map(res => ({ type: 'asdasd', data: res.data })),
        catchError(() => of({ type: 'get failed' }))
      )
    )
  )

export default [userLineLoginEpic, getUserInfoEpic]
