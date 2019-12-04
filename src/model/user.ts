import { Users } from '../../src/db/models/users'

export interface CreateUserRequestBody {
  gender: 'male' | 'female'
  birthday: string
  height: number
  weight: number
  is_entry_contest: boolean
}

export const convertResponse = (body: Users) => {
  return {
    uid: body.uid,
    gender: body.gender,
    birthday: body.birthday,
    height: body.height,
    weight: body.weight,
    waist_circumference: body.waist_circumference,
    offal_fat: body.offal_fat,
    is_entry_contest: body.is_entry_contest,
  }
}
