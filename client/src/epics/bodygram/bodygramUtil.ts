import {
  BodygramEstimation,
  IncomingEstimationType
} from '@reducer/bodygram/bodygramModel'

export const responstToEstimation = (
  data: IncomingEstimationType
): BodygramEstimation => ({
  id: data.id,
  rid: data.rid,
  uid: data.uid,
  status: data.status,
  waistCircumference: data.waist_circumference,
  offalFat: data.of_diff,
  wcDiff: data.wc_diff,
  ofDiff: data.of_diff,
  week: data.week,
  createdAt: data.created_at,
  updatedAt: data.updated_at
})