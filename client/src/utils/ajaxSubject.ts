import { Subject, Observer } from 'rxjs'
import Logger from './logger'
import { ofType } from 'redux-observable'

const ajaxSubject = new Subject<SubjectType>()

interface SubjectType {
  type: string
  data?: any
}
interface AjaxSubscriber {
  successType?: string[]
  errorType?: string[]
}

export default {
  subscribe: (subscribeType: AjaxSubscriber, observer: Partial<Observer<SubjectType>>) => {
    const { successType, errorType } = subscribeType
    const allSubscribeType = successType ? [...successType] : []
    errorType && allSubscribeType.push(...errorType)

    const subscription = ajaxSubject
      .asObservable()
      .pipe(ofType(...Object.values(allSubscribeType)))
      .subscribe({
        next: props => {
          if (subscribeType.errorType && subscribeType.errorType.includes(props.type)) {
            observer.error && observer.error(props)
          } else {
            observer.next && observer.next(props)
          }
        },
        complete: observer.complete
      })
    return subscription
  },
  success: (type: string, data?: any) => {
    Logger.info({ type, data })
    ajaxSubject.next({ type, data })
  },
  error: (type: string, data?: any) => {
    Logger.error({
      type,
      data
    })
    ajaxSubject.next({ type, data })
  }
}
