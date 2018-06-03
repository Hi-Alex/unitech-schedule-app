import * as React from 'react';
import * as styles from './ScheduleTable.scss';
import { cn } from '../../utils/className';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    cols?: BaseColProps[];
    rows?: number;
}

export interface BaseColProps {
  label: string;
}

export interface ColProps extends BaseColProps {
  rows: number;
  cols: number;
}

function Col({ rows, cols, label }: ColProps) {
  return (
    <div className={styles.Col} style={{ width: `${100 / cols}%`}}>
      <div className={styles.ColHeader}>{label}</div>
      <div className={styles.ColBody}>
        {new Array(rows).fill(0).map((_, index) => (
          <div className={styles.Cell} style={{ height: `${100 / rows}%` }} key={index} />
        ))}
      </div>
    </div>
  );
}

const timeData = ['??', 8, 9, 10, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(val => `${val}:00`);

export class Grid extends React.Component<Props> {
  public static defaultProps: Props = {
    cols: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'].map(label => ({ label })),
    rows: 13
  };

  render(): React.ReactNode {
    const { cols, rows, className, ...props } = this.props;

    return (
      <div {...props} className={cn([styles.Grid, className])}>
        <div className={styles.TimeCol}>
          {new Array(rows).fill(0).map((_, index) => (
            <div className={styles.Time} style={{ height: `${100 / rows}%` }} key={index}>
              {timeData[index + 1] || timeData[0]}
            </div>
          ))}
        </div>
        <div className={styles.Cols}>
          {cols.map(({ label }, index) => (
            <Col rows={rows} cols={cols.length} key={index} label={label} />
          ))}
        </div>
      </div>
    );
  }
}
