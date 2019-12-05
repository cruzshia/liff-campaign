import { AnyAction } from 'redux'
import { BodyActionTypes } from './actions'
import { UserActionTypes } from '../user/actions'

export interface BodygramStateType {
  intialized: boolean
  intializing: boolean
}

export const bodygramInitState = {
  intialized: false,
  intializing: false
}

export default (
  state: BodygramStateType = bodygramInitState,
  action: AnyAction
): BodygramStateType => {
  switch (action.type) {
    case BodyActionTypes.INITIALIZE_BODYGRAM_SUCCESS:
      return {
        ...state,
        intialized: true,
        intializing: false
      }
    case BodyActionTypes.INITIALIZE_BODYGRAM_FAILED:
      return {
        ...state,
        intialized: false,
        intializing: false
      }
    case BodyActionTypes.INITIALIZE_BODYGRAM:
      return {
        ...state,
        intialized: false,
        intializing: true
      }
    case UserActionTypes.LOGOUT_CLEAR_STATE:
      return bodygramInitState
    default:
      return state
  }
}
