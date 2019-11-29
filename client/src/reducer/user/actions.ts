export enum UserActionTypes {
  'LOGIN' = '@User/LOGIN',
  'SET_LOGIN_RESUILT' = '@User/SET_LOGIN_RESUILT'
}

export const loginAct = () => ({
  type: UserActionTypes.LOGIN
})

export const setLoginResult = () => ({
  type: UserActionTypes.SET_LOGIN_RESUILT
})
