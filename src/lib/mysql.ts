import * as mysql from 'mysql2/promise'

const ENV = process.env

console.log(JSON.stringify(ENV))

let connection: mysql.Connection

const createSingleConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host     : ENV["DB_HOST"],
      user     : ENV["DB_USER"],
      password : ENV["DB_PASSWORD"],
      database : ENV["DB_NAME"],
    })
  }
  return connection
}

export {createSingleConnection}