import { IClassroom } from "../../db/models";

export const Classroom = {
  housing(classroom: IClassroom) {
    return classroom.getHousing();
  }
};
