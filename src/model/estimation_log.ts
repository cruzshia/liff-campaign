import { EstimationLogs } from '../../src/db/models/estimationLogs'

export const convertResponse = (body: EstimationLogs) => {
  return {
    uid: body.uid,
    rid: body.rid,
    status: body.status,
    waist_circumference: body.waist_circumference,
    offal_fat: body.offal_fat,
    wc_diff: body.wc_diff,
    of_diff: body.of_diff,
    week: body.week,
    created_at: body.created_at,
    updated_at: body.updated_at,
  }
}
