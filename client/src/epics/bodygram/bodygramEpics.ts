import { ActionsObservable, ofType, StateObservable } from 'redux-observable'
import { catchError, map, exhaustMap, filter } from 'rxjs/operators'
import {
  BodyActionTypes,
  initBodyGramSuccessAct,
  CreateEstimationActType,
  createEstimationSuccess
} from '@reducer/bodygram/actions'

import { Action } from 'redux'
import { StoreState } from '@reducer/index'
import bodybank, { initializeBodybank } from '@src/utils/bodygram'
import Logger from '@src/utils/logger'
import { of, from } from 'rxjs'

const initBodyGramEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<StoreState>
) =>
  action$.pipe(
    ofType(BodyActionTypes.INITIALIZE_BODYGRAM),
    filter(
      () =>
        !state$.value.bodyGram.intialized || state$.value.bodyGram.intializing
    ),
    exhaustMap(() =>
      from(initializeBodybank()).pipe(
        map(() => initBodyGramSuccessAct()),
        // TODO: error handler
        catchError(error => {
          Logger.log('initialize body bank error: ', error)
          return of({ type: BodyActionTypes.INITIALIZE_BODYGRAM_FAILED })
        })
      )
    )
  )

export const createEstimationEpic = (
  action$: ActionsObservable<CreateEstimationActType>
) =>
  action$.pipe(
    ofType(BodyActionTypes.CREATE_ESTIMATION),
    exhaustMap(action =>
      from([bodybank.createEstimationRequest(action.data)]).pipe(
        map(() => {
          return createEstimationSuccess()
        }),
        // TODO: error handler
        catchError(error => {
          Logger.log('create body bank estimation error: ', error)
          return of({ type: BodyActionTypes.CREATE_ESTIMATION_FAILED })
        })
      )
    )
  )

export default [initBodyGramEpic, createEstimationEpic]
