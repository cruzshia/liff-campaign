import { History } from 'history'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
  })
