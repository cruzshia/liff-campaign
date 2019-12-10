import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import db from '../../db/models'
import { authorize } from '../../lib/authorize'
import { OK, UnAuthorized, NotFound, BadRequest } from '../../lib/response'
import { convertResponse } from '../../model/line_point'

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
    const linePoints = await db.linePoints.findAll({
      where: { userId },
      order: [[ 'point_url', 'ASC']],
    })

    if (linePoints) {
      const convertedPoints = linePoints.map((point) => convertResponse(point))
      response = OK(convertedPoints)
    } else {
      response = NotFound('Point data not found.')
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
