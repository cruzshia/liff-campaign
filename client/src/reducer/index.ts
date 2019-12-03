import { combineReducers } from 'redux'
import userReducer, { userInitState, UserStateType } from './user/reducer'
import bodygramReducer, {
  bodygramInitState,
  BodygramStateType
} from './bodygram/reducer'

export const initState = {
  user: userInitState,
  bodyGram: bodygramInitState
}

export interface StoreState {
  user: UserStateType
  bodyGram: BodygramStateType
}

export default combineReducers<StoreState>({
  user: userReducer,
  bodyGram: bodygramReducer
})
