import { APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { Connection } from 'mysql2/promise'

import { createSingleConnection } from '../../lib/mysql'

const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`)
    }
    // All log statements are written to CloudWatch
    //console.info('received:', event)

    const connection: Connection = await createSingleConnection()

    const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ')

    // 仮SQL TODO:アクセストークンでLINE profileを取得し、userid, weekでDB検索し、上書きするか新規追加するか判断する
    const sql = `INSERT INTO estimation_logs (uid, rid, waist_circumference, created_at, updated_at) VALUES (1, 2, 50.0, '${datetime}', '${datetime}')`

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
