import * as React from 'react';
import { identity, Omit } from "ramda";
import { noop } from 'lodash';
import { bind } from 'decko';
import { Grid } from './Grid';
import * as styles from './ScheduleTable.scss';
import { cn } from '../../../utils/className';
import { ILessonAttributes } from "../../../../../node-graphql/src/db/models";
import { WeekDay } from "../../../../../node-graphql/src/db/enums";

export interface ScheduleTableProps extends Omit<React.HTMLProps<HTMLDivElement>, 'onSelect'> {
  onCellClick?(column: WeekDay, row: number): any;
  onSelect?: Function;
  lessons: ILessonAttributes[];
}

export class ScheduleTable extends React.Component<ScheduleTableProps> {
  public static defaultProps: ScheduleTableProps = {
    lessons: [],
    onSelect: identity,
    onCellClick: noop
  };

  @bind
  onSelect(index: number) {
    this.props.onSelect(index, this.props.lessons[index]);
  }

  render(): React.ReactNode {
    const { lessons, className, onSelect, onCellClick, ...props } = this.props;

    return (
      <div className={cn([styles.Table, className])} {...props}>
        <Grid onCellClick={onCellClick!} />
        {
          lessons.map((lesson, index) => (
            null
          ))
        }
      </div>
    );
  }
}
