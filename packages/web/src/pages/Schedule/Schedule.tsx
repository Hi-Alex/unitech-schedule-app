import * as React from 'react';
import { hot } from 'react-hot-loader';
import { ScheduleTable } from '../../components/SheduleTable';
import * as styles from './Schedule.scss';

const from = (count, fn) => new Array(count)
  .fill(0)
  .map((_, i) => fn(i));

@hot(module)
export default class Schedule extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1 className={styles.Header}>Расписание</h1>
        <ScheduleTable lessons={[]} />
      </React.Fragment>
    );
  }
}
