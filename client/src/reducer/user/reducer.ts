import { AnyAction } from 'redux'
import { UserActionTypes } from './actions'
import { UserModelType, LinePointModel, EstimationLogModel } from './userModel'
import { removeToken } from '@src/utils/ajax'
import { BodyActionTypes } from '../bodygram/actions'

export interface UserStateType {
  token?: string
  userChecked: boolean
  profile?: UserModelType
  linePoints: LinePointModel[]
  estimationLog: EstimationLogModel[]
}

export const userInitState = {
  token: undefined,
  userChecked: false,
  linePoints: [],
  estimationLog: []
}

export default (state: UserStateType = userInitState, action: AnyAction): UserStateType => {
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
    case UserActionTypes.SET_LINE_POINTS:
      return {
        ...state,
        linePoints: action.data
      }
    case UserActionTypes.SET_ESTIMATION_LOG:
      return {
        ...state,
        estimationLog: action.data
      }
    case BodyActionTypes.SET_ESTIMATION:
      return {
        ...state,
        profile: {
          ...state.profile!,
          offalFat: action.data.offalFat,
          waistCircumference: action.data.waistCircumference
        }
      }
    default:
      return state
  }
}
