import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { authorize } from '../../lib/authorize'
import { OK, UnAuthorized, BadRequest, NotFound, ServerError } from '../../lib/response'
import { convertResponse } from '../../model/estimation_log'

import db from '../../db/models'

// const env = process.env

const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`)
  }
  // All log statements are written to CloudWatch
  // console.info('received:', event)
  // console.log(env)
  if (!event.queryStringParameters || !event.queryStringParameters.rid) {
    return BadRequest('Query parameter invalid.')
  }
  const userId: string | undefined = await authorize(event)
  if (!userId) {
    return UnAuthorized('LINE token unauthorized.')
  }

  let response: APIGatewayProxyResult

  try {
    const rid = event.queryStringParameters.rid
    const log = await db.estimationLogs.findByPk(rid)
    if (log) {
      response = OK(convertResponse(log))
    } else {
      response = NotFound('Estimation log not found.')
    }
  } catch(e) {
    response = ServerError(e)
  }

  // All log statements are written to CloudWatch
  console.info(event.headers['X-Api-Key'])
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
  return response
}

export {handler}
