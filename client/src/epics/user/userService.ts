import ajax from '@src/utils/ajax'

export interface IncomingUserData {
  uid: string
  waist_circumference?: number
  offal_fat?: number
}

export const getUserAjax = (): Promise<HTTPResponse<IncomingUserData>> =>
  ajax.get('/users/me')
