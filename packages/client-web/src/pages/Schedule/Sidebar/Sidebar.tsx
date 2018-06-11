import * as React from 'react';
import { Component } from 'react';
import { Items } from './Items/Items';
import * as styles from './Sidebar.scss';
import { Account } from './Account/Account';
import * as list from './list.svg';
import * as logout from './logout.svg';
import * as calendar from './calendar.svg';
import { Item } from './Item/Item';

export class Sidebar extends Component {
  render(): React.ReactNode {
    return (
      <div className={styles.Sidebar}>
        <Account/>
        <Items
          items={[{
            to: '/schedule',
            icon: calendar,
            label: 'Расписание'
          }, {
            to: '/lists',
            icon: list,
            label: 'Списки'
          }]}
        />
        <Item
          to={'/login'}
          icon={logout}
          label="Выход"
          className={styles.Exit}
        />
      </div>
    );
  }
}
