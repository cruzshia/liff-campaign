import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import db from '../../db/models'
import { authorize } from '../../lib/authorize'
import { OK, UnAuthorized, NotFound, BadRequest } from '../../lib/response'
import { convertResponse } from '../../model/estimation_log'

const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  // All log statements are written to CloudWatch
  // console.info('received:', event)
  // console.log(env)
  if (event.httpMethod !== 'GET') {
    throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`)
  }
  const userId: string | undefined = await authorize(event)
  if (!userId) {
    return UnAuthorized('Unauthorized.')
  }

  console.info(event.body)

  let response!: APIGatewayProxyResult

  try {
    const userLogs = await db.estimationLogs.findAll({
      where: { userId },
      order: [[ 'week', 'ASC']],
    })

    if (userLogs) {
      const convertedLogs = userLogs.map((log) => convertResponse(log))
      response = OK(convertedLogs)
    } else {
      response = NotFound('Log not found.')
    }

  } catch (e) {
    console.log(e)
    response = BadRequest(e)
  }


  // All log statements are written to CloudWatch
  console.info(event.headers['X-Api-Key'])
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
  return response
}

export {handler}
