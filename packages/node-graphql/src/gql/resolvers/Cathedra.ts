import { Faculty, ICathedra } from "../../db/models";

export interface CathedraResolvers {
  faculty(cathedra: ICathedra): any;
}

export const Cathedra: CathedraResolvers = {
  faculty({ FacultyId }) {
    return !FacultyId ? null : Faculty.find({
      where: {
        id: FacultyId
      }
    })
  }
};
