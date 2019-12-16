export type EstimationStatue = 'requested' | 'pending' | 'completed'
export interface IncomingEstimationType {
  id: number
  rid: string
  uid: string
  status: EstimationStatue
  waist_circumference: number
  offal_fat: number
  wc_diff: number
  of_diff: number
  week: number
  created_at: string
  updated_at: string // '2019-11-13 18:34:52'
}

export interface BodygramEstimation {
  id: number
  rid: string
  uid: string
  status: EstimationStatue
  waistCircumference: number
  offalFat: number
  wcDiff: number
  ofDiff: number
  week: number
  createdAt: string
  updatedAt: string
}


