import { Cathedra, Faculty, Housing, Speciality, Group, Worker, Classroom } from "../../db/models";
import { User } from "../../db/models/User";

export interface QueryHousingParams {
  id: number;
}

export const Query = {
  housing(_: any, { id }: QueryHousingParams) {
    return Housing.findById(id);
  },
  housings(_: any) {
    return Housing.findAll();
  },
  classroom(_: any, { id }: QueryHousingParams) {
    return Classroom.findById(id);
  },
  classrooms(_: any) {
    return Classroom.findAll();
  },
  faculty(_: any, { id }: QueryHousingParams) {
    return Faculty.findById(id);
  },
  faculties(_: any) {
    return Faculty.findAll();
  },
  cathedra(_: any, { id }: QueryHousingParams) {
    return Cathedra.findById(id);
  },
  cathedras(_: any) {
    return Cathedra.findAll();
  },
  speciality(_: any, { id }: QueryHousingParams) {
    return Speciality.findById(id);
  },
  specialities(_: any) {
    return Speciality.findAll();
  },
  group(_: any, { id }: QueryHousingParams) {
    return Group.findById(id);
  },
  groups(_: any) {
    return Group.findAll();
  },
  worker(_: any, { id }: QueryHousingParams) {
    return Worker.findById(id);
  },
  workers(_: any) {
    return Worker.findAll();
  },
  user(_: any, { id = 1 }: QueryHousingParams) {
    return User.findById(id);
  }
};
