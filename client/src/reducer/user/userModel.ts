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

export interface IncomingEstimationLogType {
  uid: string
  rid: string
  // status: 'requested' | 'pending' | 'completed' for fake data
  status: string
  waist_circumference: number | null
  offal_fat: number | null
  wc_diff: number | null
  of_diff: number | null
  week: number
  created_at: Date
  updated_at: Date
}

export interface EstimationLogModel {
  uid: string
  waistCircumference: number | null
  offalFat: number | null
  wcDiff: number | null
  ofDiff: number | null
  week: number
  createdAt: Date
}
