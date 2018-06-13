import * as React from 'react';
import * as styles from './ScheduleTable.scss';
import { cn } from '../../../utils/className';
import { WeekDay } from "../../../../../node-graphql/src/db/enums";
import { WorkWeekDaysOptions } from "../utils";
import { getKeys } from "../../../utils/fns";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: BaseColProps;
  rows?: number;
  onCellClick(column: WeekDay, row: number): any;
}

export interface BaseColProps extends Partial<Record<WeekDay, string>> {}

export interface ColProps extends React.HTMLProps<HTMLDivElement> {
  rows: number;
  cols: number;
  label: string;
  onCellClick(index: number): any;
}

function Col({ rows, cols, label, className, onCellClick, ...props }: ColProps) {
  return (
    <div {...props} className={cn([styles.Col, className])} style={{ width: `${100 / cols}%`}}>
      <div className={styles.ColHeader}>{label}</div>
      <div className={styles.ColBody}>
        {Array.from({ length: rows }, (_, index) => (
          <div className={styles.Cell} style={{ height: `${100 / rows}%` }} key={index} onClick={() => onCellClick(index)}/>
        ))}
      </div>
    </div>
  );
}

const timeData = ['??', 8, 9, 10, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(val => `${val}:00`);

export class Grid extends React.Component<GridProps> {
  public static defaultProps: Partial<GridProps> = {
    cols: WorkWeekDaysOptions,
    rows: 13
  };

  render(): React.ReactNode {
    const { cols, rows, className, onCellClick, ...props } = this.props;
    const colKeys = getKeys(cols);

    return (
      <div {...props} className={cn([styles.Grid, className])}>
        <div className={styles.TimeCol}>
          {Array.from({ length: rows }, (_, index) => (
            <div className={styles.Time} style={{ height: `${100 / rows}%` }} key={index}>
              {timeData[index + 1] || timeData[0]}
            </div>
          ))}
        </div>
        <div className={styles.Cols}>
          {colKeys.map(key => (
            <Col rows={rows} cols={colKeys.length} key={key} label={cols[key]} onCellClick={index => onCellClick(key, index)} />
          ))}
        </div>
      </div>
    );
  }
}
