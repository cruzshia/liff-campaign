import { combineReducers } from 'redux'
import userReducer, { userInitState, UserStateType } from './user/reducer'

export const initState = {
  user: userInitState
}

export interface StoreState {
  user: UserStateType
}

export default combineReducers<StoreState>({ user: userReducer })
