import * as React from 'react';
import { Component } from 'react';
import { Items } from './Items/Items';
import * as styles from './Sidebar.scss';
import { Account } from './Account/Account';
import * as list from './list.svg';
import * as logout from './logout.svg';
import * as calendar from './calendar.svg';
import { Item } from './Item/Item';
import { CalendarIcon } from "../../../components/Icon";

const MENU_ITEMS = [
  {
    to: '/schedule',
    icon: calendar,
    label: 'Расписание'
  },
  {
    to: '/lists',
    icon: list,
    label: 'Списки'
  },
  {
    to: '/housings',
    Icon: CalendarIcon,
    label: 'Корпуса'
  },
  {
    to: '/faculties',
    Icon: CalendarIcon,
    label: 'Факультеты'
  }
];

export class Sidebar extends Component {
  render(): React.ReactNode {
    return (
      <div className={styles.Sidebar}>
        <Account/>
        <Items items={MENU_ITEMS} />
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
