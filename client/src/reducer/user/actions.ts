import { Action } from 'redux'
import { UserModelType } from './userModel'

export enum UserActionTypes {
  LOGIN = '@User/LOGIN',
  LOGIN_ERROR = '@User/LOGIN_ERROR',
  SET_LOGIN_RESUILT = '@User/SET_LOGIN_RESUILT',

  LOGOUT = '@User/LOGOUT',
  LOGOUT_CLEAR_STATE = '@User/LOGOUT_CLEAR_STATE',

  CREATE_USER = '@User/CREATE_USER',
  SET_CREATE_RESULT = '@User/SET_CREATE_RESULT',
  CREATE_USER_ERROR = '@User/CREATE_USER_ERROR',

  UPDATE_USER = '@User/UPDATE_USER',
  UPDATE_USER_ERROR = '@User/UPDATE_USER_ERROR',
  UPDATE_USER_SUCCESS='@User/UPDATE_USER_SUCCESS',

  GET_USER_PROFILE = '@User/GET_USER_PROFILE',
  SET_USER_PROFILE = '@User/SET_USER_PROFILE',
  GET_USER_PROFILE_ERROR = '@User/GET_USER_PROFILE_ERROR'
}

export const loginAct = () => ({
  type: UserActionTypes.LOGIN
})

export const loginErrorAct = () => ({
  type: UserActionTypes.LOGIN_ERROR
})

export const setLoginResult = (data?: string) => ({
  type: UserActionTypes.SET_LOGIN_RESUILT,
  data
})

export const logoutAct = () => ({
  type: UserActionTypes.LOGOUT
})

export const logoutClearState = () => ({
  type: UserActionTypes.LOGOUT_CLEAR_STATE
})

export interface CreateUserActType extends Action {
  data: UserModelType
}
export const createUserAct = (data: UserModelType) => ({
  type: UserActionTypes.CREATE_USER,
  data
})

export const createUserErrorAct = () => ({
  type: UserActionTypes.CREATE_USER_ERROR
})

export const updateUserAct = (data: UserModelType) => ({
  type: UserActionTypes.UPDATE_USER,
  data
})

export const updateUserErrorAct = () => ({
  type: UserActionTypes.UPDATE_USER_ERROR
})

export const getUserProfileAct = () => ({
  type: UserActionTypes.GET_USER_PROFILE
})

export const getUserProfileErrorAct = () => ({
  type: UserActionTypes.GET_USER_PROFILE_ERROR
})

export const setUserProfileAct = (data: UserModelType) => ({
  type: UserActionTypes.SET_USER_PROFILE,
  data
})
