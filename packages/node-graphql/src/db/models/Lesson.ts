import { DefineAttributes, defineModel, ID_FIELD } from "../utils";
import { LessonParity, LessonParityValues, LessonType, LessonTypeValues, WeekDay, WeekDayValues } from "../enums";
import { IGroup } from "./Group";
import { IWorker } from "./Worker";
import { IClassroom } from "./Classroom";

export interface ILessonAttributes {
  id?: number;
  day: WeekDay;
  type: LessonType;
  title: string;
  parity: LessonParity;
  beginTime: number;
  duration: number;
}
export interface ILesson extends ILessonAttributes {
  group?: IGroup;
  worker?: IWorker;
  classroom?: IClassroom;
}

const EXCLUDE_DAYS: WeekDay[] = [WeekDay.SATURDAY, WeekDay.SUNDAY];
const INCLUDED_DAYS = WeekDayValues.filter(day => !EXCLUDE_DAYS.includes(day as any));

export const Lesson = defineModel<ILessonAttributes>('Lesson', ({ STRING, INTEGER, ENUM }) => {
  const attributes: DefineAttributes<ILessonAttributes> = {
    id: ID_FIELD,
    beginTime: {
      type: INTEGER(8),
      allowNull: false
    },
    day: {
      type: ENUM(INCLUDED_DAYS),
      allowNull: false
    },
    duration: {
      type: INTEGER(6),
      allowNull: false
    },
    parity: {
      type: ENUM(LessonParityValues),
      allowNull: false,
      defaultValue: LessonParity.BOTH
    },
    title: {
      type: STRING(256),
      allowNull: false
    },
    type: {
      type: ENUM(LessonTypeValues),
      allowNull: false,
      defaultValue: LessonType.PRACTICE
    }
  };

  return attributes as any;
});
