import { ActionsObservable, ofType, StateObservable } from 'redux-observable'
import { catchError, map, tap, exhaustMap, filter } from 'rxjs/operators'
import {
  BodyActionTypes,
  initBodyGramSuccessAct,
  initBodyGramErrorAct,
  CreateEstimationActType,
  createEstimationSuccessAct,
  createEstimationErrorAct,
  getEstimationFailAct,
  setEstimationResult,
  GetEstimationActType
} from '@reducer/bodygram/actions'

import { Action } from 'redux'
import { StoreState } from '@reducer/index'
import bodybank, { initializeBodybank } from '@src/utils/bodygram'
import { responstToEstimation } from './bodygramUtil'
import { getEstimationAjax } from './bodygramService'
import ajaxSubject from '@src/utils/ajaxSubject'
import { of, from } from 'rxjs'
import { unAthorizedCheck } from '../errorUtils'

const initBodyGramEpic = (action$: ActionsObservable<Action>, state$: StateObservable<StoreState>) =>
  action$.pipe(
    ofType(BodyActionTypes.INITIALIZE_BODYGRAM),
    filter(() => !state$.value.bodyGram.intialized || state$.value.bodyGram.intializing),
    exhaustMap(() =>
      from(initializeBodybank()).pipe(
        map(() => initBodyGramSuccessAct()),
        catchError(error => of(unAthorizedCheck(error, initBodyGramErrorAct())))
      )
    )
  )

export const createEstimationEpic = (action$: ActionsObservable<CreateEstimationActType>) =>
  action$.pipe(
    ofType(BodyActionTypes.CREATE_ESTIMATION),
    exhaustMap(action =>
      from([bodybank.createEstimationRequest(action.data)]).pipe(
        map(() => createEstimationSuccessAct()),
        catchError(error => of(unAthorizedCheck(error, createEstimationErrorAct())))
      )
    )
  )

export const getEstimationEpic = (action$: ActionsObservable<GetEstimationActType>) =>
  action$.pipe(
    ofType(BodyActionTypes.GET_ESTIMATION),
    exhaustMap(action =>
      from(getEstimationAjax(action.data)).pipe(
        map(res => setEstimationResult(responstToEstimation(res.data))),
        tap(() => ajaxSubject.success(BodyActionTypes.SET_ESTIMATION)),
        catchError(error => of(unAthorizedCheck(error, getEstimationFailAct())))
      )
    )
  )

export default [initBodyGramEpic, createEstimationEpic, getEstimationEpic]
