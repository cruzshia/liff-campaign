import { IncomingUserModelType, UserModelType } from '@reducer/user/userModel'

export const toUserModel = (data: IncomingUserModelType): UserModelType => ({
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
