import { Sequelize } from 'sequelize'
import { modelGenerate } from '../../lib/modelGenerator'
import { Database } from '../../model/database'

import schema from './schema'

const setModel = (sequelize: Sequelize): Database => {
  const db: any = {}

  Object.keys(schema).forEach(tableName => {
    db[tableName] = schema[tableName].factory(sequelize)
  })

  Object.keys(schema).forEach(tableName => {
    if ('associate' in db[tableName]) {
      db[tableName].associate(db)
    }
  })

  return db
};

const modelGenerator = modelGenerate()
const db = modelGenerator(setModel)

export default db
