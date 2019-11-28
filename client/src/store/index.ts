import { createStore, applyMiddleware, Middleware, compose } from 'redux'
import reducer from '../reducer'
import { createLogger } from 'redux-logger'

const middleware: Middleware[] = []
const logger: any = createLogger({ collapsed: true })

process.env.NODE_ENV !== 'production' && middleware.push(logger)

const store = createStore(reducer, compose(applyMiddleware(...middleware)))

export default store
