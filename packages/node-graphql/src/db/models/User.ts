import { Instance, Model, Sequelize, DataTypes } from 'sequelize';

export interface UserAttributes {
  id: number;
  photo: string;
  firstName?: string;
  lastName?: string;
  groupId?: number;
}
export interface UserInstance extends Instance<UserAttributes> {
  dataValues: UserAttributes;
}
export interface UserModel extends Model<UserInstance, UserAttributes> {}

export default function createUserModel(sequelize: Sequelize, { INTEGER, DATE, STRING }: DataTypes) {
  return sequelize.define<UserInstance, UserAttributes>('UserAttributes', {
    id: {
      type: INTEGER(11),
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    photo: {
      type: STRING(128),
      defaultValue: ''
    },
    createdAt: DATE,
    updatedAt: DATE,
    deletedAt: DATE
  });
}
