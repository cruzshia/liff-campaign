import { Response } from '../../model/lambda'

const handler = async (event: any) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`)
    }
    // All log statements are written to CloudWatch
    console.info('received:', event)

    const response: Response = {
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
