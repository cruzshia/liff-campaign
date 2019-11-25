import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { Connection } from 'mysql2/promise'

import { createSingleConnection } from '../../lib/mysql'
import { authorize } from '../../lib/authorize'
import { OK, UnAuthorized, BadRequest } from '../../lib/response'
import { CreateUserRequestBody } from '../../model/user'

const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  if (event.httpMethod !== 'POST') {
    throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`)
  }
  const userId: string | undefined = await authorize(event)
  if (!userId) {
    return UnAuthorized('LINE token unauthorized.')
  }
  // All log statements are written to CloudWatch
  console.info('received:', event)

  let response: APIGatewayProxyResult

  try {
    const { gender, birthday, height, weight }: CreateUserRequestBody = JSON.parse(event.body || '{}')

    const connection: Connection = await createSingleConnection()

    const sql = `INSERT INTO users (id, gender, birthday, height, weight) \
      VALUES (${userId}, ${gender}, ${birthday}, ${height}, ${weight})`

    const result = await connection.query(sql)
    console.log(result)

    response = OK({})
  } catch (e) {
    response = BadRequest(e)
  }

  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
  return response
}

export {handler}
