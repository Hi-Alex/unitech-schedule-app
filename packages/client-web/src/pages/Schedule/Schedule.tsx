import * as React from 'react';
import { hot } from 'react-hot-loader';
import { ScheduleTable } from './SheduleTable';
import * as styles from './Schedule.scss';
import { ILessonAttributes } from "../../../../node-graphql/src/db/models";
import { Modal } from "../../components/Modal";
import { NewLesson } from "./NewLesson";
import { WeekDay } from "../../../../node-graphql/src/db/enums";

export interface ScheduleState {
  lessons: ILessonAttributes[];
  newLesson?: Partial<ILessonAttributes>;
}

@hot(module)
export default class Schedule extends React.Component<any, ScheduleState> {
  state: ScheduleState = {
    lessons: []
  };

  openNewLesson = () => this.setState({
    newLesson: {}
  });

  closeNewLesson = () => this.setState({
    newLesson: null
  });

  submitNewLesson = (lesson: ILessonAttributes) => this.setState({
    newLesson: null,
    lessons: this.state.lessons.concat(lesson)
  });

  onCellClick = (day: WeekDay, hours: number) => {
    this.setState({
      newLesson: {
        day,
        beginTime: (hours + 8) * 60
      }
    });
  };

  render() {
    const { lessons, newLesson } = this.state;

    return (
      <React.Fragment>
        <h1 className={styles.Header}>Расписание</h1>
        <ScheduleTable lessons={lessons} onCellClick={this.onCellClick} />
        <Modal opened={!!newLesson} variant="regular" onClose={this.closeNewLesson} className={styles.NewLesson}>
          {newLesson && <NewLesson onSubmit={this.submitNewLesson} lesson={newLesson} />}
        </Modal>
      </React.Fragment>
    );
  }
}
