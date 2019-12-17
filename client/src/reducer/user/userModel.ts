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

export interface IncomingLinePointsType {
  uid: string
  point: number
  point_url: string
  week: number | null
  created_at: string
  updated_at: string
}

export interface LinePointModel {
  uid: string
  point: number
  pointUrl: string
  week: number | null
  createdAt: string
  updatedAt: string
}
