import { IFaculty } from "../../db/models";

export const Faculty = {
  classroom(faculty: IFaculty) {
    return faculty.getClassroom();
  }
};
