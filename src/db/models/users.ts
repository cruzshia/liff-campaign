import { Sequelize, Model, DataTypes } from 'sequelize'

const TABLE_NAME = 'users'

class Users extends Model {
  public uid!: string
  public gender!: "male" | "female"
  public birthday!: string
  public height: number
  public weight: number | null
  public waist_circumference: number | null
  public offal_fat: number | null
  public is_entry_contest!: boolean
  public bodygram_id: string | null
  public rank: number | null
  public created_at: Date
  public updated_at: Date

  public static attach(sequelize: Sequelize): void {
    this.init(
      {
        uid: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.STRING
        },
        gender: {
          allowNull: false,
          type: DataTypes.STRING
        },
        birthday: {
          allowNull: false,
          type: DataTypes.STRING
        },
        height: {
          type: DataTypes.FLOAT,
        },
        weight: {
          type: DataTypes.FLOAT,
        },
        waist_circumference: {
          type: DataTypes.FLOAT,
        },
        offal_fat: {
          type: DataTypes.FLOAT,
        },
        is_entry_contest: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
        },
        bodygram_id: {
          type: DataTypes.STRING,
        },
        rank: {
          type: DataTypes.INTEGER,
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
  Users.attach(sequelize)

  return Users
}

export { Users, factory }

