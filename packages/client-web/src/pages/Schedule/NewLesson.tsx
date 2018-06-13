import * as React from "react";
import * as styles from './Schedule.scss';
import { identity } from 'lodash';
import { Button, Heading, Input } from '../../components';
import { ILessonAttributes } from "../../../../node-graphql/src/db/models";
import { LessonParity, LessonType, WeekDay } from "../../../../node-graphql/src/db/enums";
import { Select } from "../../components/UI/Select";
import { HoursOptions, LessonParityOptions, LessonTypeOptions, MinutesOptions, WorkWeekDaysOptions } from "./utils";
import { Label } from "../../components/Typography";
import { ModalHeading } from "../../components/Modal";

export interface NewLessonProps {
  lesson?: Partial<ILessonAttributes>;
  onSubmit: (lesson: ILessonAttributes) => any;
}

const DEFAULT_DURATION = 1000 * 60 * 60 * 1.5;
const PLACEHOLDER = 'Без названия';
const getEventValue = (event: React.SyntheticEvent<HTMLInputElement>) => event.currentTarget.value;

export class NewLesson extends React.Component<NewLessonProps, ILessonAttributes> {
  state: ILessonAttributes = Object.assign({}, {
    type: LessonType.PRACTICE,
    title: '',
    parity: LessonParity.BOTH,
    duration: DEFAULT_DURATION,
    day: WeekDay.MONDAY,
    beginTime: 0
  }, this.props.lesson || {});

  createListener<Key extends keyof ILessonAttributes, RawValue>(
    key: Key,
    get: (value: RawValue) => ILessonAttributes[Key] = identity
  ) {
    return (value: RawValue) => this.setState({
      [key]: get(value)
    } as any);
  }

  submit = () => {
    this.props.onSubmit(this.state);
  };

  createTimeSetter<Key extends 'hours' | 'minutes'>(key: Key) {
    return value => {
      const { time } = this;

      time[key] = value;
      this.setState({
        beginTime: ((time.hours - 1) * 60) + +time.minutes
      });
    }
  }

  get time() {
    const { beginTime } = this.state;
    const hours = Math.ceil(beginTime / 60);
    const minutes = beginTime % 60;

    return { hours, minutes };
  }

  render() {
    const { type, day, title, parity } = this.state;
    const { minutes, hours } = this.time;

    return (
      <React.Fragment>
        <ModalHeading>Новый предмет | {title || PLACEHOLDER}</ModalHeading>
        <div className={styles.Content}>
          <Label>Дисциплина</Label>
          <Input
            placeholder={PLACEHOLDER}
            value={title}
            onChange={this.createListener('title', getEventValue)}
          />
          <div className={styles.Row}>
            <div>
              <Label>Время</Label>
              <div className={styles.TimeRow}>
                <Select
                  placeholder="Часы"
                  options={HoursOptions}
                  selected={hours + ''}
                  onChange={this.createTimeSetter("hours")}
                />
                <span>:</span>
                <Select
                  placeholder="Минуты"
                  options={MinutesOptions}
                  selected={minutes + ''}
                  onChange={this.createTimeSetter("minutes")}
                />
              </div>
              <Label>Тип занятия</Label>
              <Select
                options={LessonTypeOptions}
                selected={type}
                onChange={this.createListener('type') as any}
              />
              <Label>День недели</Label>
              <Select
                options={WorkWeekDaysOptions}
                selected={day as any}
                onChange={this.createListener('day') as any}
              />
            </div>
            <div>
              <Label>Четность недели</Label>
              <Select
                options={LessonParityOptions}
                selected={parity}
                onChange={this.createListener('parity') as any}
              />
            </div>
          </div>
          <Button onClick={this.submit}>Продолжить</Button>
        </div>
      </React.Fragment>
    );
  }
}
