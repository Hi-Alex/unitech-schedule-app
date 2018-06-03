import { DBInstance, DefineAttributes, defineModel, ID_FIELD } from "../utils";
import { IClassroom } from "./Classroom";

export interface IFacultyAttributes {
  id?: number;
  name: string;
}
export interface IFaculty extends IFacultyAttributes {
  Classroom?: IClassroom;
  ClassroomId?: number;
  getClassroom?(): Promise<DBInstance<IClassroom>>;
}

export const Faculty = defineModel<IFaculty>('Faculty', ({ STRING }) => {
  const attributes: DefineAttributes<IFacultyAttributes> = {
    id: ID_FIELD,
    name: {
      type: STRING(128),
      allowNull: false,
      unique: true
    }
  };

  return attributes as any;
});
