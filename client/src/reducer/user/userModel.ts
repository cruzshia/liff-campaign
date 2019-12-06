export interface IncomingUserModelType {
  uid: string
  gender: 'male' | 'female'
  birthday: string
  height: number
  weight: number
  waist_circumference?: number
  offal_fat?: number
  is_entry_contest: boolean
}

export interface UserModelType {
  uid: string
  gender: 'male' | 'female'
  birthday: string
  height: number
  weight: number
  waistCircumference?: number
  offalFat?: number
  isEntryContest: boolean
}
