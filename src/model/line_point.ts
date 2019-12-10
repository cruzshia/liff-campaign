import { LinePoints } from '../../src/db/models/linePoints'

export const convertResponse = (body: LinePoints) => {
  return {
    uid: body.uid,
    point: body.point,
    point_url: body.point_url,
    week: body.week,
    created_at: body.created_at,
    updated_at: body.updated_at,
  }
}
