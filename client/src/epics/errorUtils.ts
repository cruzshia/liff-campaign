import { logoutAct } from '@reducer/user/actions'
import { AnyAction } from 'redux'

export const unAthorizedCheck = (error: any, orgAction: AnyAction) => {
  const { response = {} } = error
  if (response.status === 401) {
    return logoutAct()
  }
  return orgAction
}
