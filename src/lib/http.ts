import rp from 'request-promise'

const isTest = process.env.NODE_ENV === 'test'

// Convenient request senders
export const get = async (host: string, path: string, key: string) => sendRequest('GET', host, path, null, '', key)
export const post = async (host: string, path: string, body: any, key: string) => sendRequest('POST',host,  path, null, body, key)

export const sendRequest = async (method: string, host: string, path: string, queryParams: any, body: any, key: string) => {
  const reqBody = (typeof(body) !== 'string') ? JSON.stringify(body) : body
  const baseHeaders = {
    'x-api-key': key,
    'accept': 'application/json',
  }
  const reqHeaders = (reqBody.length > 0) ? Object.assign(baseHeaders, {'content-type': 'application/json'}) : baseHeaders
  return rp({
    method: method,
    uri: `${host}${path}`,
    body: reqBody,
    headers: reqHeaders,
    qs: queryParams,
    simple: false, // Reject only when requests failed with connection issues
    transform: jsonReader,
  }).catch(handleUnexpectedError)
}

const jsonReader = (body: any, { statusCode, headers }: any) => {
  const isJson = headers['content-type'] && headers['content-type'].startsWith('application/json')
  return { status: statusCode, body: isJson ? JSON.parse(body) : body }
}

const handleUnexpectedError = (error: any) => {
  if (!isTest) {
    console.error(error)
  }
  return { status: 500, body: { message: error.message } }
}
