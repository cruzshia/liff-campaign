import { Action } from 'redux'
import { BodygramEstimation } from './bodygramModel'

export enum BodyActionTypes {
  SET_INITIALIZE_STATE = '@Bodygram/SET_INITIALIZE_STATE',
  INITIALIZE_BODYGRAM = '@Bodygram/INITIALIZE_BODYGRAM',
  INITIALIZE_BODYGRAM_SUCCESS = '@Bodygram/INITIALIZE_BODYGRAM_SUCCESS',
  INITIALIZE_BODYGRAM_FAILED = '@Bodygram/INITIALIZE_BODYGRAM_FAILED',

  CREATE_ESTIMATION = '@Bodygram/CREATE_ESTIMATION',
  CREATE_ESTIMATION_SUCCESS = '@Bodygram/CREATE_ESTIMATION_SUCCESS',
  CREATE_ESTIMATION_FAILED = '@Bodygram/CREATE_ESTIMATION_FAILED',

  GET_ESTIMATION = '@Bodygram/GET_ESTIMATION',
  GET_ESTIMATION_ERROR = '@Bodygram/GET_ESTIMATION_ERROR',
  SET_ESTIMATION = '@Bodygram/SET_ESTIMATION'
}

export const initBodyGramAct = () => ({
  type: BodyActionTypes.INITIALIZE_BODYGRAM
})

export const initBodyGramSuccessAct = () => ({
  type: BodyActionTypes.INITIALIZE_BODYGRAM_SUCCESS
})

export const initBodyGramErrorAct = () => ({
  type: BodyActionTypes.INITIALIZE_BODYGRAM_FAILED
})

export interface CreateEstimationActType extends Action {
  data: CreateEstimationProps
}

export const createEstimationAct = (data: CreateEstimationProps) => ({
  type: BodyActionTypes.CREATE_ESTIMATION,
  data
})

export const createEstimationSuccessAct = () => ({
  type: BodyActionTypes.CREATE_ESTIMATION_SUCCESS
})

export const createEstimationErrorAct = () => ({
  type: BodyActionTypes.CREATE_ESTIMATION_FAILED
})

export interface GetEstimationActType extends Action {
  data: string
}
export const getEstimationAct = (rid: string) => ({
  type: BodyActionTypes.GET_ESTIMATION,
  data: rid
})

export const getEstimationFailAct = () => ({
  type: BodyActionTypes.GET_ESTIMATION_ERROR
})

export const setEstimationResult = (data: BodygramEstimation) => ({
  type: BodyActionTypes.SET_ESTIMATION,
  data
})
