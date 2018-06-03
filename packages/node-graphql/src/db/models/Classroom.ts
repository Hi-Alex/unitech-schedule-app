import { DBInstance, defineModel, ID_FIELD } from "../utils";
import { IHousing } from "./Housing";

export interface IClassroomAttributes {
  id?: number;
  floor?: number;
  number: string | number;
  capacity: number;
}
export interface IClassroom extends IClassroomAttributes {
  housing?: IHousing;
  getHousing?(): Promise<DBInstance<IHousing>>;
}

export const Classroom = defineModel<IClassroomAttributes>('Classroom', ({ STRING, INTEGER }) => ({
  id: ID_FIELD,
  floor: {
    type: INTEGER(2)
  },
  number: {
    type: STRING(4),
    allowNull: false
  },
  capacity: {
    type: INTEGER(4),
    allowNull: false
  }
}));
