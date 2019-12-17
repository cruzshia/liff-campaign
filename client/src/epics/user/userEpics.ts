import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { of, from } from 'rxjs'
import { catchError, map, tap, mergeMap, exhaustMap } from 'rxjs/operators'
import {
  UserActionTypes,
  setLoginResult,
  getUserProfileAct,
  CreateUserActType,
  setUserProfileAct,
  createUserErrorAct,
  updateUserErrorAct,
  getUserProfileErrorAct,
  logoutClearState,
  setLinePointsAct
} from '@reducer/user/actions'

import { toUserModel, toLinePointModel } from './userUtil'
import { initBodyGramAct } from '@reducer/bodygram/actions'

import { LIFF_ID } from '@src/appConfig'
import { setToken } from '@src/utils/ajax'
import * as UserService from './userService'
import { isDev } from '@src/appConfig'
import { unAthorizedCheck } from '../errorUtils'
import ajaxSubject from '@src/utils/ajaxSubject'

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
            return of({ type: 'liff-login..' })
          } else {
            const token = window.liff.getAccessToken()
            setToken(isDev ? 'dev_token' : token)
            return of(setLoginResult(token), getUserProfileAct(), initBodyGramAct())
          }
        }),
        catchError(() => tap(error => ajaxSubject.error(UserActionTypes.LOGIN_ERROR, error)))
      )
    )
  )

const userLineLogoutEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(UserActionTypes.LOGOUT),
    exhaustMap(() => {
      window.liff.logout()
      return of(logoutClearState())
    })
  )

export const getUserInfoEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(UserActionTypes.GET_USER_PROFILE),
    exhaustMap(() =>
      from(UserService.getUserAjax()).pipe(
        map(res => setUserProfileAct(toUserModel(res.data))),
        catchError(err => of(unAthorizedCheck(err, getUserProfileErrorAct())))
      )
    )
  )

export const createUserEpic = (action$: ActionsObservable<CreateUserActType>) =>
  action$.pipe(
    ofType(UserActionTypes.CREATE_USER),
    exhaustMap(actions =>
      from(UserService.createUserAjax(actions.data)).pipe(
        map(res => setUserProfileAct(toUserModel(res.data))),
        catchError(err => of(unAthorizedCheck(err, createUserErrorAct())))
      )
    )
  )

export const updateUserEpic = (action$: ActionsObservable<CreateUserActType>) =>
  action$.pipe(
    ofType(UserActionTypes.UPDATE_USER),
    exhaustMap(actions =>
      from(UserService.updateUserAjax(actions.data)).pipe(
        map(res => setUserProfileAct(toUserModel(res.data))),
        tap(() => {
          ajaxSubject.success(UserActionTypes.UPDATE_USER_SUCCESS)
        }),
        catchError(err => of(unAthorizedCheck(err, updateUserErrorAct())))
      )
    )
  )

export const getUserLinePointsEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType(UserActionTypes.GET_LINE_POINTS),
    exhaustMap(() =>
      from(UserService.getUserLinePointAjax()).pipe(
        map(res => setLinePointsAct(res.data.map(point => toLinePointModel(point)))),
        catchError(err => of(unAthorizedCheck(err, updateUserErrorAct())))
      )
    )
  )

export default [
  createUserEpic,
  updateUserEpic,
  userLineLoginEpic,
  userLineLogoutEpic,
  getUserInfoEpic,
  getUserLinePointsEpic
]
