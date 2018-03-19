import * as React from 'react';
import { Component } from 'react';
import { Items } from './Items/Items';
import * as styles from './Sidebar.scss';
import { Account } from './Account/Account';

export class Sidebar extends Component {
  render() {
    return (
      <div className={styles.Sidebar}>
        <Account/>
        <Items active={'schedule'}
               items={{
                 schedule: ['', 'Расписание'],
                 lists: ['', 'Списки']
               }} onClick={(key) => console.log(key)}/>
      </div>
    );
  }
}