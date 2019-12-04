import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { authorize } from '../../lib/authorize'
import { OK, UnAuthorized, BadRequest, NotFound, ServerError } from '../../lib/response'
import { UpdateUserRequestBody } from '../../model/user'
import { convertResponse } from '../../model/user'
import db from '../../db/models'

const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  const userId: string | undefined = await authorize(event)
  if (!userId) {
    return UnAuthorized('LINE token unauthorized.')
  }
  // All log statements are written to CloudWatch
  // console.info('received:', event)

  let response: APIGatewayProxyResult

  try {
    const user = await db.users.findByPk(userId)
    switch (event.httpMethod) {
      case 'GET':
        if (user) {
          response = OK(convertResponse(user))
        } else {
          response = NotFound('User not found.')
        }
        break
      case 'PUT':
        if (user) {
          const body: UpdateUserRequestBody = JSON.parse(event.body || '{}')
          await db.users.update(
            body,
            {
              where: { uid: userId },
            })
          const updatedUser = await db.users.findByPk(userId)
          response = updatedUser ? OK(convertResponse(updatedUser)) : ServerError({ message: 'ServerError.' })
        } else {
          response = NotFound('User not found.')
        }
        break
      default:
        response = BadRequest('Method not allowed.')
        break
    }
  } catch(e) {
    response = BadRequest(e)
  }

  // All log statements are written to CloudWatch
  console.info(event.headers['X-Api-Key'])
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
  return response
}

export {handler}
