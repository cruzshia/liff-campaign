import rp from 'request-promise'

import { Token } from '../model/token'

const isTest = process.env.NODE_ENV === 'test'

// Convenient request senders
export const get = async (host: string, path: string, token: Token) => sendRequest('GET', host, path, null, '', token)
export const post = async (host: string, path: string, body: any, token: Token) => sendRequest('POST',host,  path, null, body, token)

export const bodyGramToken = (key: string | undefined): Token => {
  return { 'x-api-key': key }
}

export const lineToken = (key: string | undefined): Token => {
  return { authorization: `Bearer ${key}` }
}

export const sendRequest = async (method: string, host: string, path: string, queryParams: any, body: any, token: Token) => {
  const reqBody = (typeof(body) !== 'string') ? JSON.stringify(body) : body
  const baseHeaders = {
    ...token,
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
