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
    icon: calendar,
    label: 'Корпуса'
  },
  {
    to: '/faculties',
    Icon: CalendarIcon,
    label: 'Факультеты'
  },
  {
    to: '/cathedras',
    icon: list,
    label: 'Кафедры'
  },
  {
    to: '/specialities',
    icon: list,
    label: 'Cпециальности'
  },
  {
    to: '/groups',
    icon: list,
    label: 'Группы'
  },
  {
    to: '/workers',
    icon: list,
    label: 'Преподаватели'
  },
  {
    to: '/classrooms',
    icon: list,
    label: 'Аудитории'
  },
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
