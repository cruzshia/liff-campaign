import { SessionAction, SessionActionTypes } from '../actions/session'

export default (state: string | null = null, action: SessionAction) => {
  switch (action.type) {
    case SessionActionTypes.GET_SUCCESS:
      return action.token
    case SessionActionTypes.GET_FAILURE:
      return null
    default:
      return state
  }
}
