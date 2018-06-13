import { LessonParity, LessonType, WeekDay } from "../../../../node-graphql/src/db/enums";
import { Diff, Values } from "../../utils/types";

export const AVAILABLE_MINUTES = Array.from({ length: 12 }, (_, index) => index * 5);
export const AVAILABLE_HOURS = Array.from({ length: 11 }, (_, index) => 8 + index);

export const LessonTypeOptions: Readonly<Record<LessonType, string>> = Object.freeze({
  [LessonType.CONFERENCE]: 'Конференция',
  [LessonType.PRACTICE]: 'Практика',
  [LessonType.LECTURE]: 'Лекция',
  [LessonType.SEMINAR]: 'Семинар'
});

export const WorkWeekDaysOptions: Readonly<Record<Diff<WeekDay, WeekDay.SUNDAY | WeekDay.SATURDAY>, string>> = Object.freeze({
  [WeekDay.MONDAY]: 'Понедельник',
  [WeekDay.TUESDAY]: 'Вторник',
  [WeekDay.WEDNESDAY]: 'Среда',
  [WeekDay.THURSDAY]: 'Четверг',
  [WeekDay.FRIDAY]: 'Пятница'
});

export const WeekDaysOptions: Readonly<Record<WeekDay, string>> = Object.freeze({
  ...WorkWeekDaysOptions,
  [WeekDay.SATURDAY]: 'Суббота',
  [WeekDay.SUNDAY]: 'Воскресенье'
});

export const LessonParityOptions: Readonly<Record<LessonParity, string>> = Object.freeze({
  [LessonParity.BOTH]: 'Нет разделения',
  [LessonParity.EVEN]: 'Нечетная',
  [LessonParity.ODD]: 'Четная'
});

export const HoursOptions: { readonly [key: string]: string; } = Object.freeze(AVAILABLE_HOURS.reduce((target, value) => {
  target[value] = (value + '');
  return target;
}, {}));

export const MinutesOptions: { readonly [key: string]: string; } = Object.freeze(AVAILABLE_MINUTES.reduce((target, value) => {
  target[value] = (value + '').padStart(2, '0');
  return target;
}, {}));
