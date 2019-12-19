import { APIGatewayProxyResult } from 'aws-lambda'

const commonResponse = (statusCode: number, e: any): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(e),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : "*",
    },
  }
}

export const ServerError = (e: any): APIGatewayProxyResult => {
  return commonResponse(500, e)
}

export const BadRequest = (message: string): APIGatewayProxyResult => {
  return commonResponse(400, message)
}

export const UnAuthorized = (message: string): APIGatewayProxyResult => {
  return commonResponse(401, { message })
}

export const NotFound = (message: string): APIGatewayProxyResult => {
  return commonResponse(404, { message })
}

export const OK = (e: any): APIGatewayProxyResult => {
  return commonResponse(200, e)
}

export const Created = (e: any): APIGatewayProxyResult => {
  return commonResponse(201, e)
}
