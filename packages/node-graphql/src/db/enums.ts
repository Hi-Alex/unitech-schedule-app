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
export enum UserRole {
  ROOT = 'ROOT',
  WORKER = 'WORKER',
  STUDENT = 'STUDENT'
}

const EXCLUDE_DAYS: WeekDay[] = [WeekDay.SATURDAY, WeekDay.SUNDAY];

export const WeekDayValues: WeekDay[] = compact(Object.keys(WeekDay) as WeekDay[]);
export const WeekWorkDayValues: WeekDay[] = WeekDayValues.filter(day => !EXCLUDE_DAYS.includes(day as any));
export const UserRoleValues = compact(Object.keys(UserRole));
export const LessonTypeValues = compact(Object.keys(LessonType));
export const LessonParityValues = compact(Object.keys(LessonParity));
