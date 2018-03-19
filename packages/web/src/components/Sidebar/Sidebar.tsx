import * as React from 'react';
import { Component } from 'react';
import { Items } from './Items/Items';
import * as styles from './Sidebar.scss';

export class Sidebar extends Component {
  render() {
    return (
      <div className={styles.Sidebar}>
        <Items active={'group'}
               items={{
                 schedule: ['', 'Расписание'],
                 lists: ['', 'Списки']
               }} onClick={(key) => console.log(key)}/>
      </div>
    );
  }
}