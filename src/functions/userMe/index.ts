import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
    if ((event.httpMethod !== 'GET') && (event.httpMethod !== 'PUT')) {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`)
    }
    // All log statements are written to CloudWatch
    // console.info('received:', event)
    // console.log(env)


    let response: APIGatewayProxyResult

    try {
        let res = ''  // It will be stored values from DB

        if (event.httpMethod === 'GET') {
          res = 'GET'
        } else if (event.httpMethod === 'PUT') {
          res = 'PUT'
        }

        response = {
            statusCode: 200,
            body: JSON.stringify(res),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    } catch(e) {
        response = {
            statusCode: 500,
            body: JSON.stringify(e),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    }

    // All log statements are written to CloudWatch
    console.info(event.headers['X-Api-Key'])
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
    return response
}

export {handler}