import { createStore, applyMiddleware, Middleware } from 'redux'
import rootReducer, { initState } from '@reducer/index'
import rootEpic from '@epics/index'
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'

const middleware: Middleware[] = []
const logger: any = createLogger({ collapsed: true })

process.env.NODE_ENV !== 'production' && middleware.push(logger)

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    const logger: any = createLogger({ diff: true, collapsed: true })
    return applyMiddleware(...middleware, logger)
  }
  return applyMiddleware(...middleware)
}

export default function configureStore(initialState = initState) {
  const epicMiddleware = createEpicMiddleware()

  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([epicMiddleware])
  )

  epicMiddleware.run(rootEpic)
  return store
}
