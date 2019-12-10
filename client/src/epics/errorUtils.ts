import { logoutAct } from '@reducer/user/actions'
import { AnyAction } from 'redux'
import ajaxSubject from '@src/utils/ajaxSubject'

export const unAthorizedCheck = (error: any, orgAction: AnyAction) => {
  const { response = {} } = error
  ajaxSubject.error(orgAction.type, error)
  if (response.status === 401) {
    return logoutAct()
  }
  return orgAction
}
