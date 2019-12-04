import schema from '../db/models/schema'

export interface Database {
  estimationLogs: typeof schema.estimationLogs.EstimationLogs
  users: typeof schema.users.Users
}
