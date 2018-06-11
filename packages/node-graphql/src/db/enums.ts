import { isNumber, compact } from "lodash";

export enum WeekDay {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}
export enum LessonType {
  LECTURE = 'LECTURE',
  PRACTICE = 'PRACTICE',
  SEMINAR = 'SEMINAR',
  CONFERENCE = 'CONFERENCE'
}
export enum LessonParity {
  BOTH = 'BOTH',
  EVEN = 'EVEN',
  ODD = 'ODD'
}
export const WeekDayValues = compact(Object.keys(WeekDay));
export const LessonTypeValues = compact(Object.keys(LessonType));
export const LessonParityValues = compact(Object.keys(LessonParity));
