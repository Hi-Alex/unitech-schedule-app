import { Faculty, ISpeciality } from "../../db/models";

export interface SpecialityResolvers {
  faculty(speciality: ISpeciality): any;
}

export const Speciality: SpecialityResolvers = {
  faculty({ FacultyId }) {
    return !FacultyId ? null : Faculty.find({
      where: {
        id: FacultyId
      }
    })
  }
};
