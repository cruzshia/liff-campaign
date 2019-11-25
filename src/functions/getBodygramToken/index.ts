import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { bodyGramToken, post } from '../../lib/http'
import { authorize } from '../../lib/authorize'
import { OK, UnAuthorized, ServerError } from '../../lib/response'

const env = process.env

const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  // All log statements are written to CloudWatch
  // console.info('received:', event)
  // console.log(env)
  if (event.httpMethod !== 'GET') {
    throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`)
  }
  const userId: string | undefined = await authorize(event)
  if (!userId) {
    return UnAuthorized('LINE token unauthorized.')
  }

  let response: APIGatewayProxyResult

  try {
    // TODO: Get user_id from API header token or query.
    const res = await post(env.hostUrl || '', '/token', { user_id: userId}, bodyGramToken(env.token))
    response = OK(res.body)
  } catch(e) {
    response = ServerError(e)
  }

  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
  return response
}

export {handler}
