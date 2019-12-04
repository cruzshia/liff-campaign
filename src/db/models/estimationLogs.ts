import { Sequelize, Model, DataTypes } from 'sequelize'

const TABLE_NAME = 'estimation_logs'

class EstimationLogs extends Model {
  public uid!: number
  public rid!: string
  public status!: 'requested' | 'pending' | 'completed'
  public waist_circumference: number | null
  public offal_fat: number | null
  public wc_diff: number | null
  public of_diff: number | null
  public week!: number
  public created_at: Date
  public updated_at: Date

  public static attach(sequelize: Sequelize): void {
    this.init(
      {
        uid: {
          allowNull: false,
          type: DataTypes.STRING
        },
        rid: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.STRING,
        },
        status: {
          allowNull: false,
          type: DataTypes.ENUM('requested', 'pending', 'completed'),
          defaultValue: 'requested'
        },
        waist_circumference: {
          type: DataTypes.FLOAT,
        },
        offal_fat: {
          type: DataTypes.FLOAT,
        },
        wc_diff: {
          type: DataTypes.FLOAT,
        },
        of_diff: {
          type: DataTypes.FLOAT,
        },
        week: {
          allowNull: false,
          type: DataTypes.INTEGER,
          defaultValue: 1
        },
        created_at: {
          type: DataTypes.DATE,
          field: 'created_at'
        },
        updated_at: {
          type: DataTypes.DATE,
          field: 'updated_at'
        }
      },
      {
        tableName: TABLE_NAME,
        underscored: true,
        timestamps: true,
        sequelize: sequelize,
      }
    )
  }

  public static associate(): void {
  }
}

const factory = (sequelize: Sequelize) => {
  EstimationLogs.attach(sequelize)

  return EstimationLogs
}

export { EstimationLogs, factory }

