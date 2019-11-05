'use strict'

const rp = require('request-promise')
const isTest = process.env.NODE_ENV === 'test'

// Convenient request senders
const get = async (host, path, key) => sendRequest('GET', host, path, null, '', key)
const post = async (host, path, body, key) => sendRequest('POST',host,  path, null, body, key)

const sendRequest = async (method, host, path, queryParams, body, key) => {
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

const jsonReader = (body, { statusCode, headers }) => {
  const isJson = headers['content-type'] && headers['content-type'].startsWith('application/json')
  return { status: statusCode, body: isJson ? JSON.parse(body) : body }
}

const handleUnexpectedError = (error) => {
  if (!isTest) {
    console.error(error)
  }
  return { status: 500, body: { message: error.message } }
}

module.exports = { get, post, sendRequest }
