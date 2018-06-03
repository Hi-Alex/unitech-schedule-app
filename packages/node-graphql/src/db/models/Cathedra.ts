import { DefineAttributes, defineModel, ID_FIELD } from "../utils";
import { IClassroom } from "./Classroom";
import { IFaculty } from "./Faculty";

export interface ICathedraAttributes {
  id: number;
  name: string;
}
export interface ICathedra extends ICathedraAttributes {
  Classroom?: IClassroom;
  Faculty?: IFaculty;
}

export const Cathedra = defineModel<ICathedra>('Cathedra', ({ STRING }) => {
  const attributes: DefineAttributes<ICathedraAttributes> = {
    id: ID_FIELD,
    name: {
      type: STRING(128),
      allowNull: false,
      unique: true
    }
  };

  return attributes as any;
});
