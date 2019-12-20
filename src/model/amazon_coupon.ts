import { AmazonCoupons } from '../../src/db/models/amazonCoupons'

export const convertResponse = (body: AmazonCoupons) => {
  return {
    uid: body.uid,
    point: body.point,
    point_url: body.point_url,
    created_at: body.created_at,
    updated_at: body.updated_at,
  }
}
