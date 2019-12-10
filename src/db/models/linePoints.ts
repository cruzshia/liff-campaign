import { Sequelize, Model, DataTypes } from 'sequelize'

const TABLE_NAME = 'line_points'

class LinePoints extends Model {
  public uid: string | null
  public point!: number
  public point_url!: string
  public week: number | null
  public created_at: Date
  public updated_at: Date

  public static attach(sequelize: Sequelize): void {
    this.init(
      {
        uid: {
          type: DataTypes.STRING
        },
        point: {
          allowNull: false,
          type: DataTypes.INTEGER
        },
        point_url: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.STRING,
        },
        week: {
          type: DataTypes.INTEGER
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
  LinePoints.attach(sequelize)

  return LinePoints
}

export { LinePoints, factory }
