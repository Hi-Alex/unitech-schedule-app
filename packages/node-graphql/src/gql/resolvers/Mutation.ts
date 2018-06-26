import {
  Classroom,
  Housing,
  Worker,
  Faculty,
  Cathedra,
  Group,
  IClassroom,
  IHousing,
  IWorker, IFaculty, ICathedra, Speciality, ISpeciality, IGroup
} from "../../db/models";
import { Omit } from "../../typings";

export interface ResolveFn<Options extends object = any, Source = any, Context = any> {
  (parent: Source, options: Options, context: Context, info: any): any | Promise<any>;
}
export interface CreateResolver<Input> extends ResolveFn<{
  data: Input;
}> {}
export interface DeleteResolver<Extends = {}> extends ResolveFn<{
  id: number;
} & Extends> {}
export interface UpdateResolver<Input> extends ResolveFn<{
  id: number;
  data: Partial<Input>;
}> {}
export interface HousingInput extends Omit<IHousing, 'id'> {}
export interface WorkerInput extends Omit<IWorker, 'id'> {}
export interface CathedraInput extends Omit<ICathedra, 'id'> {}
export interface GroupInput extends Omit<IGroup, 'id'> {}
export interface SpecialityInput extends Omit<ISpeciality, 'id'> {}
export interface FacultyInput extends Omit<IFaculty, 'id'> {}
export interface ClassroomInput extends Omit<IClassroom, 'id'> {}

export interface MutationResolvers {
  createHousing: CreateResolver<HousingInput>;
  updateHousing: UpdateResolver<HousingInput>;
  deleteHousing: DeleteResolver;
  createFaculty: CreateResolver<FacultyInput>;
  updateFaculty: UpdateResolver<FacultyInput>;
  deleteFaculty: DeleteResolver;
  createWorker: CreateResolver<WorkerInput>;
  updateWorker: UpdateResolver<WorkerInput>;
  deleteWorker: DeleteResolver;
  createCathedra: CreateResolver<CathedraInput>;
  updateCathedra: UpdateResolver<CathedraInput>;
  deleteCathedra: DeleteResolver;
  createSpeciality: CreateResolver<SpecialityInput>;
  updateSpeciality: UpdateResolver<SpecialityInput>;
  deleteSpeciality: DeleteResolver;
  createGroup: CreateResolver<GroupInput>;
  updateGroup: UpdateResolver<GroupInput>;
  deleteGroup: DeleteResolver;
  createClassroom: CreateResolver<ClassroomInput>;
  updateClassroom: UpdateResolver<ClassroomInput>;
  deleteClassroom: DeleteResolver;
}

export const Mutation: MutationResolvers = {
  createHousing(_, { data }) {
    return Housing.create(data);
  },
  updateHousing(_, { data, id }) {
    return Housing.update(data, {
      where: {
        id
      }
    });
  },
  deleteHousing(_, { id }) {
    return Housing.destroy({
      where: {
        id
      }
    });
  },
  createFaculty(_, { data }) {
    return Faculty.create(data);
  },
  updateFaculty(_, { data, id }) {
    return Faculty.update(data, {
      where: {
        id
      }
    });
  },
  deleteFaculty(_, { id }) {
    return Faculty.destroy({
      where: {
        id
      }
    });
  },
  createCathedra(_, { data }) {
    return Cathedra.create(data);
  },
  updateCathedra(_, { data, id }) {
    return Cathedra.update(data, {
      where: {
        id
      }
    });
  },
  deleteCathedra(_, { id }) {
    return Cathedra.destroy({
      where: {
        id
      }
    });
  },
  createSpeciality(_, { data }) {
    return Speciality.create(data);
  },
  updateSpeciality(_, { data, id }) {
    return Speciality.update(data, {
      where: {
        id
      }
    });
  },
  deleteSpeciality(_, { id }) {
    return Speciality.destroy({
      where: {
        id
      }
    });
  },
  createGroup(_, { data }) {
    return Group.create(data);
  },
  updateGroup(_, { data, id }) {
    return Group.update(data, {
      where: {
        id
      }
    });
  },
  deleteGroup(_, { id }) {
    return Group.destroy({
      where: {
        id
      }
    });
  },
  createWorker(_, { data }) {
    return Worker.create(data);
  },
  updateWorker(_, { data, id }) {
    return Worker.update(data, {
      where: {
        id
      }
    });
  },
  deleteWorker(_, { id }) {
    return Worker.destroy({
      where: {
        id
      }
    });
  },
  createClassroom(_, { data }) {
    return Classroom.create(data);
  },
  updateClassroom(_, { data, id }) {
    return Classroom.update(data, {
      where: {
        id
      }
    });
  },
  deleteClassroom(_, { id }) {
    return Classroom.destroy({
      where: {
        id
      }
    });
  }
};
