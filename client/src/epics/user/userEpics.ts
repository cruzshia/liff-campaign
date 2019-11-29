import { ActionsObservable, ofType } from 'redux-observable'
import { catchError, map, exhaustMap } from 'rxjs/operators'
import { UserActionTypes, setLoginResult } from '@reducer/user/actions'

import { of, from } from 'rxjs'

const userLoginEpic = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(UserActionTypes.LOGIN),
    exhaustMap(() =>
      from([1]).pipe(
        map(() => setLoginResult()),
        catchError(() => of(setLoginResult()))
      )
    )
  )

export default [userLoginEpic]
