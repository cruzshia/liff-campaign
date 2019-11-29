import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

// const env = process.env

const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`)
    }
    if (!event.queryStringParameters || !event.queryStringParameters.rid) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: 'Bad Request.'}),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    }
    // All log statements are written to CloudWatch
    // console.info('received:', event)
    // console.log(env)

    let response: APIGatewayProxyResult

    try {
        // TODO: Get user_id from API header token or query.
        const rid = event.queryStringParameters ? event.queryStringParameters.rid : null
        console.log(rid)
        // TODO: get estimation_log from Mysql(RDS).
        response = {
            statusCode: 200,
            body: JSON.stringify({ // 仮レスポンス
                id: 1,
                rid,
                uid: 'user_id',
                status: 'requested',
                waist_circumference: 80,
                offal_fat: 20,
                of_diff: 0,
                week: 1,
                created_at: '2019-11-13 18:34:52',
                updated_at: '2019-11-13 18:34:52',
            }),
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
