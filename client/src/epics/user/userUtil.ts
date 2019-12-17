import { IncomingLinePointsType, IncomingUserModelType, UserModelType, LinePointModel } from '@reducer/user/userModel'

export const toUserModel = (data: IncomingUserModelType): UserModelType => ({
  uid: data.uid,
  gender: data.gender,
  birthday: data.birthday,
  height: data.height,
  weight: data.weight,
  waistCircumference: data.waist_circumference,
  offalFat: data.offal_fat,
  isEntryContest: data.is_entry_contest
})

export const toUserPayload = (data: UserModelType) => ({
  gender: data.gender,
  birthday: data.birthday,
  height: data.height,
  weight: data.weight,
  waist_circumference: data.waistCircumference,
  offalFat: data.offalFat,
  is_entry_contest: data.isEntryContest
})

export const toLinePointModel = (data: IncomingLinePointsType): LinePointModel => ({
  uid: data.uid,
  point: data.point,
  pointUrl: data.point_url,
  week: data.week,
  createdAt: data.created_at,
  updatedAt: data.updated_at
})
