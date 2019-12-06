import { ActionsObservable, ofType } from 'redux-observable'
import { AnyAction } from 'redux'
import { catchError, map, mergeMap, exhaustMap } from 'rxjs/operators'
import {
  UserActionTypes,
  setLoginResult,
  loginErrorAct,
  getUserProfileAct,
  CreateUserActType,
  setUserProfileAct,
  createUserErrorAct,
  updateUserErrorAct,
  getUserProfileErrorAct,
  logoutClearState
} from '@reducer/user/actions'

import { toUserModel } from './userUtil'
import { initBodyGramAct } from '@reducer/bodygram/actions'

import { LIFF_ID } from '@src/appConfig'
import { setToken } from '@src/utils/ajax'
import * as UserService from './userService'
import { isDev } from '@src/appConfig'
import { unAthorizedCheck } from '../errorUtils'
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
            return of({ type: 'liff-login..' })
          } else {
            const token = window.liff.getAccessToken()
            setToken(isDev ? 'dev_token' : token)
            return of(setLoginResult(token), getUserProfileAct(), initBodyGramAct())
          }
        }),
        catchError(() => of(loginErrorAct()))
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

/*
example:
  createUserAct({
    gender: 'male',
    birthday: '2019/12/12',
    height: 165,
    weight: 60,
    isEntryContest: true
  })
*/
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
        catchError(err => of(unAthorizedCheck(err, updateUserErrorAct())))
      )
    )
  )

export default [createUserEpic, updateUserEpic, userLineLoginEpic, userLineLogoutEpic, getUserInfoEpic]
