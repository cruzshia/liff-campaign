import ajax from '@src/utils/ajax'
import {
  UserModelType,
  IncomingUserModelType,
  IncomingLinePointsType,
  IncomingEstimationLogType
} from '@reducer/user/userModel'
import { toUserPayload } from './userUtil'

export const getUserAjax = (): Promise<HTTPResponse<IncomingUserModelType>> => {
  return ajax.get('/users/me')
}
export const createUserAjax = (data: UserModelType): Promise<HTTPResponse<IncomingUserModelType>> =>
  ajax.post('/users', toUserPayload(data))

export const updateUserAjax = (data: UserModelType): Promise<HTTPResponse<IncomingUserModelType>> =>
  ajax.put('/users/me', toUserPayload(data))

export const getUserLinePointAjax = (): Promise<HTTPResponse<IncomingLinePointsType[]>> => ajax.get('/line_points')

export const getEstimationLogAjax = (): Promise<HTTPResponse<IncomingEstimationLogType[]>> =>
  ajax.get('/estimation_logs')
