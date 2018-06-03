import { Classroom, IHousing } from "../../db/models";

export const Housing = {
  classrooms(housing: IHousing) {
    return (housing as any).getClassrooms();
  }
};
