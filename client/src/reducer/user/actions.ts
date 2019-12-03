export enum UserActionTypes {
  LOGIN = '@User/LOGIN',
  SET_LOGIN_RESUILT = '@User/SET_LOGIN_RESUILT',
  CLEAR_LOGIN_STATE = '@User/CLEAR_LOGIN_STATE',

  CREATE_USER = '@User/CREATE_USER',
  SET_CREATE_RESULT = '@User/SET_CREATE_RESULT',
  CREATE_USER_ERROR = '@User/CREATE_USER_ERROR',

  GET_USER_PROFILE = '@User/GET_USER_PROFILE'
}

export const loginAct = () => ({
  type: UserActionTypes.LOGIN
})

export const setLoginResult = (data?: string) => ({
  type: UserActionTypes.SET_LOGIN_RESUILT,
  data
})

export const clearLoginAct = () => ({
  type: UserActionTypes.CLEAR_LOGIN_STATE
})

export const getUserProfileAct = () => ({
  type: UserActionTypes.GET_USER_PROFILE
})
