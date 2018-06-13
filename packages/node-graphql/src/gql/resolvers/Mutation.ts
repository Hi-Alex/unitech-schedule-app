import { Classroom, Housing, IClassroomAttributes, IHousingAttributes } from "../../db/models";
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
export interface HousingInput extends Omit<IHousingAttributes, 'id'> {}
export interface ClassroomInput extends Omit<IClassroomAttributes, 'id'> {}

export interface MutationResolvers {
  createHousing: CreateResolver<HousingInput>;
  updateHousing: UpdateResolver<HousingInput>;
  deleteHousing: DeleteResolver;
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
