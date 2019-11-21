import { History } from 'history'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import session from './session'

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    session,
  })
