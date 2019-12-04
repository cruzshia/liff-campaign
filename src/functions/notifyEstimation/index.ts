import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import db from '../../db/models'
import { OK, BadRequest } from '../../lib/response'
import { convertResponse } from '../../model/estimation_log'

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
    const uid = body.request.user_id
    const status = body.request.status
    const waist_circumference = body.request.waist_circumference
    const offal_fat = null

    const log = await db.estimationLogs.findByPk(rid)
    const userLogs = await db.estimationLogs.findAll({
      where: { uid },
      order: [[ 'updated_at', 'DESC']],
    })
    const lastLog = userLogs[userLogs.length - 1]

    // TODO: Implement offal_fat logic.
    // TODO: Implement offal_fat diff.
    // TODO: Implement datetime check.
    if (log) {
      await db.estimationLogs.update({
        status,
        waist_circumference,
        wc_diff: lastLog && lastLog.waist_circumference ? waist_circumference - lastLog.waist_circumference : null,
      },
      {
        where: { rid },
      })
      const updatedLog = await db.estimationLogs.findByPk(rid)
      response = updatedLog ? OK(convertResponse(updatedLog)) : BadRequest('')
    } else {
      const createdLog = await db.estimationLogs.create({
        uid,
        rid,
        status,
        waist_circumference: waist_circumference || null,
        offal_fat: offal_fat,
        wc_diff: lastLog && lastLog.waist_circumference ? waist_circumference - lastLog.waist_circumference : null,
        of_diff: offal_fat && lastLog && lastLog.offal_fat ? offal_fat - lastLog.offal_fat : null,
        week: userLogs.length + 1,
      })
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
