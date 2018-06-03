import { WeekDay, WeekDayValues } from "../enums";
import { DefineAttributes, defineModel, ID_FIELD } from "../utils";
import { IClassroom } from "./Classroom";

export interface IHousingAttributes {
  id?: number;
  name: string;
  address: string;
  floors: number;
  workTime: WeekDay[];
}

export interface IHousing extends IHousingAttributes {
  Classrooms?: IClassroom[];
}

export const Housing = defineModel<IHousing>('Housing', ({ STRING, INTEGER, ARRAY, ENUM }) => {
  const attributes: DefineAttributes<IHousingAttributes> = {
    id: ID_FIELD,
    name: {
      type: STRING(128),
      allowNull: false,
      unique: true
    },
    address: {
      type: STRING(256),
      allowNull: false,
      unique: true
    },
    floors: {
      type: INTEGER(4),
      comment: 'Количество этажей в здании'
    },
    workTime: {
      type: ARRAY(ENUM(WeekDayValues)),
      comment: 'Рабочие дни недели'
    }
  };

  return attributes as any;
});
