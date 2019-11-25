import { APIGatewayEvent } from 'aws-lambda'

import { get, lineToken } from '../lib/http'

const isDevelopment = process.env.NODE_ENV !== 'production'

const LINE_HOST = 'https://api.line.me'
const PROFILE_PATH = '/v2/profile'

interface ProfileResponse {
  userId?: string
  displayName?: string | null
  message?: string | null
}

export const authorize = async (event: APIGatewayEvent) => {
  let userId: string | undefined
  try {
    console.info(event.headers.Authorization)
    const key = event.headers.Authorization
    /* ex.
      {
        "userId": "U7b8706f584eb1abab44a8b1c4c8fb23f",
        "displayName": "Acs.Saito"
      }
    */
    console.log(isDevelopment)
    if (isDevelopment) {
      userId = key === 'dev_token' ? 'dev_user_id' : undefined
    } else {
      const res: ProfileResponse = await get(LINE_HOST, PROFILE_PATH, lineToken(key))
      userId = res.userId
    }
  } catch(e) {
    console.error(e)
  }
  return userId
}
