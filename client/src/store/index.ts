import { createStore, applyMiddleware, Middleware } from 'redux'
import rootReducer, { initState } from '@reducer/index'
import rootEpic from '@epics/index'
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import { isDev } from '@src/appConfig'

const middleware: Middleware[] = []
const logger: any = createLogger({ collapsed: true })

isDev && middleware.push(logger)

const bindMiddleware = (middleware: any) => {
  if (isDev) {
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
