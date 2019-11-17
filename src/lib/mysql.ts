import mysql from 'mysql'

const ENV = process.env

console.log(JSON.stringify(ENV))

let connection: any = null

const createSingleConnection = () => {
  connection = mysql.createConnection({
    host     : ENV["DB_HOST"],
    user     : ENV["DB_USER"],
    password : ENV["DB_PASSWORD"],
    database : ENV["DB_NAME"],
  });

  connection.on('error', (err: any) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // サーバがコネクションを切った場合は再接続
      createSingleConnection()
      console.log(`Reconnected`)
    } else {
      throw err
    }
  })
}

createSingleConnection()

export default connection