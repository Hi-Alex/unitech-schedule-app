import * as React from 'react';
import { identity } from 'ramda';
import { bind } from 'decko';
import { Grid } from './Grid';
import * as styles from './ScheduleTable.scss';
import { cn } from '../../utils/className';

export interface Lesson {
  day: string;
  from: any;
  to: any;
}

export interface Props {
    className?: any;
    onSelect?: Function;
    lessons: Lesson[];
}

export class ScheduleTable extends React.Component<Props> {
  public static defaultProps: Props = {
    lessons: [],
    onSelect: identity
  };

  @bind
  onSelect(index: number) {
    this.props.onSelect(index, this.props.lessons[index]);
  }

  render(): React.ReactNode {
    return (
      <div className={cn([styles.Table, this.props.className])}>
        <Grid />
        {
          this.props.lessons.map((lesson, index) => (
            null
          ))
        }
      </div>
    );
  }
}
