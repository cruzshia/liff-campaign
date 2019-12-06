import ajax from '@src/utils/ajax'
import { UserModelType, IncomingUserModelType } from '@reducer/user/userModel'
import { toUserPayload } from './userUtil'

export const getUserAjax = (): Promise<HTTPResponse<IncomingUserModelType>> => {
  return ajax.get('/users/me')
}
export const createUserAjax = (
  data: UserModelType
): Promise<HTTPResponse<IncomingUserModelType>> =>
  ajax.post('/users', toUserPayload(data))

export const updateUserAjax = (
  data: UserModelType
): Promise<HTTPResponse<IncomingUserModelType>> =>
  ajax.put('/users/me', toUserPayload(data))
