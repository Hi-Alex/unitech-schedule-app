import { Speciality, IGroup } from "../../db/models";

export interface GroupResolvers {
  speciality(group: IGroup): any;
}

export const Group: GroupResolvers = {
  speciality({ SpecialityId }) {
    return !SpecialityId ? null : Speciality.findById(SpecialityId)
  }
};
