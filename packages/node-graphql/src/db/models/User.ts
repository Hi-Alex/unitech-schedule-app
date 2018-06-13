import { DefineAttributes, defineModel, ID_FIELD } from "../utils";
import { IFaculty } from "./Faculty";
import { ICathedra } from "./Cathedra";
import { UserRole, UserRoleValues } from "../enums";

export interface IUserAttributes {
  id?: number;
  photo: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
}
export interface IUser extends IUserAttributes {}

export const User = defineModel<IUserAttributes>('User', ({ STRING, ENUM }) => {
  const attributes: DefineAttributes<IUserAttributes> = {
    id: ID_FIELD,
    username: {
      type: STRING(64),
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
