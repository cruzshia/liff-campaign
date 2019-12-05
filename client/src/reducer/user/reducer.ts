import { AnyAction } from 'redux'
import { UserActionTypes } from './actions'
import { UserModelType } from './userModel'
import { removeToken } from '@src/utils/ajax'

export interface UserStateType {
  token?: string
  userChecked: boolean
  profile?: UserModelType
}

export const userInitState = {
  token: undefined,
  userChecked: false
}

export default (
  state: UserStateType = userInitState,
  action: AnyAction
): UserStateType => {
  switch (action.type) {
    case UserActionTypes.SET_LOGIN_RESUILT:
      return {
        ...state,
        token: action.data
      }
    case UserActionTypes.LOGOUT_CLEAR_STATE:
      removeToken()
      return userInitState
    case UserActionTypes.SET_USER_PROFILE:
      const newProfile = { ...action.data }
      return {
        ...state,
        profile: newProfile,
        userChecked: true
      }
    case UserActionTypes.GET_USER_PROFILE_ERROR:
      return {
        ...state,
        profile: undefined,
        userChecked: true
      }
    default:
      return state
  }
}
