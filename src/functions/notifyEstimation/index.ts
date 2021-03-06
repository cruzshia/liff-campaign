import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import db from '../../db/models'
import { OK, BadRequest } from '../../lib/response'
import { getOffalFat } from '../../lib/offalFat'
import { convertResponse } from '../../model/estimation_log'
import { post, lineToken } from '../../lib/http'

const SENDMESSAGE_HOST = 'https://apistage.dialogone.jp'
const SENDMESSAGE_PATH = '/v1/messagesend'
const point_table = [10, 5, 5, 20, 5, 5, 5,  20, 5, 5, 5, 30]
const coupon_table = [5, 0, 0, 10, 0, 0, 0,  10, 0, 0, 0, 10]

const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'POST') {
    throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`)
  }
  // All log statements are written to CloudWatch
  //console.info('received:', event)
  console.info(event.body)

  let response: APIGatewayProxyResult

  try {
    const body = JSON.parse(event.body || '{}')
    const rid = body.request.id
    const bodygram_id = body.request.user_id
    const waist_circumference = body.request.waist_circumference || null

    let status
    switch (body.request.status) {
      case 'pendingAutomaticEstimation':
        status = 'pending'
        break
      default:
        status = body.request.status
        break
    }

    const user = await db.users.findOne({ where: { bodygram_id }})
    if (!user) {
      return BadRequest('')
    }
    const uid = user.uid
    const offal_fat = (user && waist_circumference) ? getOffalFat(user, waist_circumference) : null

    const log = await db.estimationLogs.findByPk(rid)
    const userLogs = await db.estimationLogs.findAll({
      where: { uid },
      order: [[ 'updated_at', 'DESC']],
    })

    // TODO: Implement datetime check.
    if (log) {
      const lastLog = userLogs[1]
      await db.estimationLogs.update({
        status,
        waist_circumference,
        offal_fat,
        wc_diff: waist_circumference && lastLog && lastLog.waist_circumference ? waist_circumference - lastLog.waist_circumference : null,
        of_diff: offal_fat && lastLog && lastLog.offal_fat ? offal_fat - lastLog.offal_fat : null,
      },
      {
        where: { rid },
      })
      await db.users.update({ waist_circumference, offal_fat }, { where: { uid }})
      const updatedLog = await db.estimationLogs.findByPk(rid)
      response = updatedLog ? OK(convertResponse(updatedLog)) : BadRequest('')

      if("completed" === status ) {
        const week = log.week
        const point = point_table[week]

        // ????????????line_point??????point????????????user_id????????????????????????????????????
        const unStoredRecords = await db.linePoints.findAll({
          where: { uid :null, point },
          limit: 1,
        })
        // ????????????????????????????????????????????????
        if (unStoredRecords.length === 0) {
          // ????????????????????????????????????
          // response = BadRequest('')
          console.error('Not found available point.')
        } else {
          // ???????????????uid???week??????????????????
          await db.linePoints.update({
            uid,
            week,
          },
          {
            where: {  uid :null, point :point },
            limit: 1,
          })

          // URL?????????????????????????????????(Line Point)
          const key = event.headers.Authorization
          await post(SENDMESSAGE_HOST, SENDMESSAGE_PATH, body, lineToken(key))
        }

        // ????????????amazon_coupons??????point????????????user_id????????????????????????????????????
        const coupon_rate = coupon_table[week]
        if(coupon_rate !== 0) {
          const unStoredCouponRecords = await db.amazonCoupons.findAll({
            where: { uid :null, point },
            limit: 1,
          })
          // ????????????????????????????????????????????????
          if (unStoredCouponRecords.length === 0) {
            // ????????????????????????????????????
            // response = BadRequest('')
            console.error('Not found available coupon.')
          } else {
            // ???????????????uid??????????????????
            await db.amazonCoupons.update({
              uid,
            },
            {
              where: {  uid :null, point :point },
              limit: 1,
            })

            // URL?????????????????????????????????(Amazon coupon)
            const key = event.headers.Authorization
            await post(SENDMESSAGE_HOST, SENDMESSAGE_PATH, body, lineToken(key))
          }
        }

      }

    } else {
      const lastLog = userLogs[0]
      const createdLog = await db.estimationLogs.create({
        uid,
        rid,
        status,
        waist_circumference: waist_circumference || null,
        offal_fat,
        wc_diff: waist_circumference && lastLog && lastLog.waist_circumference ? waist_circumference - lastLog.waist_circumference : null,
        of_diff: offal_fat && lastLog && lastLog.offal_fat ? offal_fat - lastLog.offal_fat : null,
        week: userLogs.length + 1,
      })
      await db.users.update({ waist_circumference, offal_fat }, { where: { uid }})
      response = OK(convertResponse(createdLog))
    }
  } catch (e) {
    console.log(e)
    response = BadRequest(e)
  }

  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
  return response
}

export {handler}
