import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import connection from '../../lib/mysql'

const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`)
    }
    // All log statements are written to CloudWatch
    console.info('received:', event)

    const sql = "SELECT * FROM information_schema.PROCESSLIST"

    const result = await connection.query(sql)
    console.log(result)

    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json',
        },
    }

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`)
    return response
}

export {handler}
