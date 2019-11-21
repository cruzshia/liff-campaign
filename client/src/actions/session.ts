import { Dispatch } from 'redux'
import liff, { init } from '../utils/liff'

export enum SessionActionTypes {
  GET_SUCCESS = 'SESSION_GET_SUCCESS',
  GET_FAILURE = 'SESSION_GET_FAILURE',
}

export interface SessionAction {
  type: SessionActionTypes
  token?: string
}

const getLineSessionSuccess = (token: string) => ({
  type: SessionActionTypes.GET_SUCCESS,
  token,
})
const getLineSessionFailure = () => ({ type: SessionActionTypes.GET_FAILURE })

export const getLineSession = () => async (dispatch: Dispatch) => {
  // initialize and login.
  await init()

  try {
    const token = await liff.getAccessToken()
    dispatch(getLineSessionSuccess(token))
  } catch (e) {
    console.error(e)
    dispatch(getLineSessionFailure())
  }
}
