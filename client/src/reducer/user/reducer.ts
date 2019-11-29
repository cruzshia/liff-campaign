import { AnyAction } from 'redux'
import { UserActionTypes } from './actions'

export interface UserStateType {
  token?: string
}

export const userInitState = {
  token: undefined
}

export default (
  state: UserStateType = userInitState,
  action: AnyAction
): UserStateType => {
  switch (action.type) {
    case UserActionTypes.SET_LOGIN_RESUILT:
      return {
        ...state,
        token: 'abc'
      }
    default:
      return state
  }
}