import { APIGatewayEvent } from 'aws-lambda'
import crypto from 'crypto'

import { get, lineToken } from '../lib/http'

const LINE_HOST = 'https://api.line.me'
const PROFILE_PATH = '/v2/profile'

interface Response {
  status: number
  body: ProfileResponse
}
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

    if (key === 'dev_token') {
      userId = 'dev_user_id'
    } else {
      const res: Response = await get(LINE_HOST, PROFILE_PATH, lineToken(key))
      console.log(res)
      userId = res.body.userId
    }
  } catch(e) {
    console.error(e)
  }
  const shasum = crypto.createHash('sha1')
  return userId ? shasum.update(userId).digest('hex') : undefined
}
