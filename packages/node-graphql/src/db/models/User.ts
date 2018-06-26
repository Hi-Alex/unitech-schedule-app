import { DefineAttributes, defineModel, ID_FIELD } from "../utils";
import { UserRole, UserRoleValues } from "../enums";

export interface IUserAttributes {
  id?: number;
  photo: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
}
export interface IUser extends IUserAttributes {}

export const User = defineModel<IUser>('User', ({ STRING, ENUM }) => {
  const attributes: DefineAttributes<IUserAttributes> = {
    id: ID_FIELD,
    username: {
      type: STRING(64),
      allowNull: false
    },
    password: {
      type: STRING(256),
      allowNull: false
    },
    firstName: {
      type: STRING(64)
    },
    lastName: {
      type: STRING(128)
    },
    photo: {
      type: STRING(512)
    },
    role: {
      type: ENUM(UserRoleValues),
      allowNull: false
    }
  };

  return attributes as any;
});
