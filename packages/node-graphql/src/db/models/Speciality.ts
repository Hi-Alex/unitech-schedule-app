import { defineModel, ID_FIELD } from "../utils";
import { IFaculty } from "./Faculty";

export interface ISpecialityAttributes {
  id?: number;
  name: string;
  code: string;
  shortName: string;
}
export interface ISpeciality extends ISpecialityAttributes {
  faculty?: IFaculty;
  FacultyId?: number;
}

export const Speciality = defineModel<ISpecialityAttributes>('Speciality', ({ STRING }) => ({
  id: ID_FIELD,
  name: {
    type: STRING(128),
    allowNull: false,
    unique: true
  },
  code: {
    type: STRING(128),
    allowNull: false,
    unique: true
  },
  shortName: {
    type: STRING(128),
    allowNull: false,
    unique: true
  }
}));
