import { Action } from 'redux'

export enum BodyActionTypes {
  SET_INITIALIZE_STATE = '@Bodygram/SET_INITIALIZE_STATE',
  INITIALIZE_BODYGRAM = '@Bodygram/INITIALIZE_BODYGRAM',
  INITIALIZE_BODYGRAM_SUCCESS = '@Bodygram/INITIALIZE_BODYGRAM_SUCCESS',
  INITIALIZE_BODYGRAM_FAILED = '@Bodygram/INITIALIZE_BODYGRAM_FAILED',
  CREATE_ESTIMATION = '@Bodygram/CREATE_ESTIMATION',
  CREATE_ESTIMATION_SUCCESS = '@Bodygram/CREATE_ESTIMATION_SUCCESS',
  CREATE_ESTIMATION_FAILED = '@Bodygram/CREATE_ESTIMATION_FAILED'
}

export const initBodyGramAct = () => ({
  type: BodyActionTypes.INITIALIZE_BODYGRAM
})

export const initBodyGramSuccessAct = () => ({
  type: BodyActionTypes.INITIALIZE_BODYGRAM_SUCCESS
})

export interface CreateEstimationActType extends Action {
  data: CreateEstimationProps
}

export const createEstimation = (data: CreateEstimationProps) => ({
  type: BodyActionTypes.CREATE_ESTIMATION,
  data
})

export const createEstimationSuccess = () => ({
  type: BodyActionTypes.CREATE_ESTIMATION_SUCCESS
})
