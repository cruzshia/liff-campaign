import { Sequelize, Op } from 'sequelize'
import mysql2 from 'mysql2'
import { Database } from '../model/database'

const ENV = process.env

export default class ModelGenerater {
  public sequelize: Sequelize

  public constructor() {
    this.sequelize = new Sequelize(ENV["DB_NAME"] || '', ENV["DB_USER"] || '', ENV["DB_PASSWORD"] || '', {
      host: ENV["DB_HOST"] || '',
      dialect: 'mysql',
      dialectModule: mysql2,
      port: 3306,
      logging: true,
      omitNull: true,
    })
  }
}

export const modelGenerate = () => {
  const modelGenerator = new ModelGenerater()

  return (setModel: any) => {
    const db: Database = setModel(modelGenerator.sequelize)

    return {
      ...db,
      Sequelize,
      sequelize: modelGenerator.sequelize,
      Op,
    }
  }
}
