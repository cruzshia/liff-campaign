const { post } = require('../lib/http');

const env = process.env;

exports.getBodyGramTokenHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    //console.info('received:', event);
    console.log(env);

    let response = {}

    try {
        const res = await post(env.hostUrl, '/token', { user_id: "unique_user_id_test"}, env.token)
        response = {
            statusCode: 200,
            body: JSON.stringify(res),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    } catch(e) {
        response = {
            statusCode: 500,
            body: JSON.stringify(e),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
