import { DefineAttributes, defineModel, ID_FIELD } from "../utils";
import { IFaculty } from "./Faculty";
import { ICathedra } from "./Cathedra";

export interface IWorkerAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  position: string;
}

export interface IWorkerGeneric {
  FacultyId: number;
  CathedraId: number;
}

export interface IWorker extends IWorkerAttributes,IWorkerGeneric {
  faculty?: IFaculty;
  cathedra?: ICathedra;
}

export const Worker = defineModel<IWorker>('Worker', ({ STRING }) => {
  const attributes: DefineAttributes<IWorkerAttributes> = {
    id: ID_FIELD,
    firstName: {
      type: STRING(64),
      allowNull: false
    },
    lastName: {
      type: STRING(128),
      allowNull: false
    },
    position: {
      type: STRING(256)
    }
  };

  return attributes as any;
});
