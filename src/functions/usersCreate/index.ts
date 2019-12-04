import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { authorize } from '../../lib/authorize'
import { Created, UnAuthorized, BadRequest } from '../../lib/response'
import { CreateUserRequestBody } from '../../model/user'
import { convertResponse } from '../../model/user'
import db from '../../db/models'

const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'POST') {
    throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`)
  }

  const userId: string | undefined = await authorize(event)
  if (!userId) {
    return UnAuthorized('LINE token unauthorized.')
  }
  // All log statements are written to CloudWatch
  //console.info('received:', event)

  let response: APIGatewayProxyResult

  try {
    const { gender, birthday, height, weight, is_entry_contest }: CreateUserRequestBody = JSON.parse(event.body || '{}')

    const user = await db.users.findByPk(userId)
    if (user) {
      response = Created(convertResponse(user))
    } else {
      const createdUser = await db.users.create({
        uid: userId,
        gender,
        birthday,
        height,
        weight,
        is_entry_contest,
      })
      response = Created(convertResponse(createdUser))
    }
  } catch (e) {
    response = BadRequest(e)
  }

  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
  return response
}

export {handler}
