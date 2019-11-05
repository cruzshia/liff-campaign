import { createHashHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import createRootReducer from '../reducers/index'

export const history = createHashHistory()

const mandatoryMiddlewares = [thunkMiddleware, routerMiddleware(history)]
const logger: any = createLogger({ diff: true, collapsed: true })
const composed =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...mandatoryMiddlewares))
    : composeWithDevTools(applyMiddleware(...mandatoryMiddlewares, logger))

export const store = createStore(createRootReducer(history), composed)
