import { defineModel, ID_FIELD } from "../utils";
import { ISpeciality } from "./Speciality";

export interface IGroupAttributes {
  id: number;
  year: number;
  number: number;
  studentsCount: number;
}
export interface IGroup extends IGroupAttributes {
  speciality: ISpeciality;
}

export const Group = defineModel<IGroupAttributes>('Group', ({ INTEGER }) => ({
  id: ID_FIELD,
  year: {
    type: INTEGER(4),
    allowNull: false
  },
  number: {
    type: INTEGER(2),
    allowNull: false
  },
  studentsCount: {
    type: INTEGER(3),
    allowNull: false
  }
}));
