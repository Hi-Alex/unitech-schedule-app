import { Faculty, Cathedra, ICathedra, IWorker } from "../../db/models";

export interface WorkerResolvers {
  faculty(worker: IWorker): any;
  cathedra(worker:IWorker): any;
}

export const Worker: WorkerResolvers = {
  faculty({ FacultyId }) {
    return !FacultyId ? null : Faculty.find({
      where: {
        id: FacultyId
      }
    })
  },
  cathedra({ CathedraId }) {
    return !CathedraId ? null : Cathedra.find({
      where: {
        id: CathedraId
      }
    })
  }
};
