import { Faculty, Housing } from "../../db/models";

export interface QueryHousingParams {
  id: number;
}

export const Query = {
  housing(_: any, { id }: QueryHousingParams) {
    return Housing.findById(id);
  },
  faculty(_: any, { id }: QueryHousingParams) {
    return Faculty.findById(id);
  },
  housings(_: any) {
    return Housing.findAll();
  }
};
