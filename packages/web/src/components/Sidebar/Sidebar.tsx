import * as React from 'react';
import { Component } from 'react';
import { Items } from './Items/Items';
import * as styles from './Sidebar.scss';
import { Account } from './Account/Account';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { setActiveSidebarItem } from '../../store/actions';
import * as list from './list.svg';
import * as logout from './logout.svg';
import * as calendar from './calendar.svg';
import { Item } from './Item/Item';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';

export interface StateProps {
  active?: string;
}
export interface DispatchProps {
  setActiveSidebarItem: typeof setActiveSidebarItem;
}

export class SidebarView extends Component<StateProps & DispatchProps & RouteComponentProps<any>> {
  componentWillMount(){
    this.props.setActiveSidebarItem(this.props.history.location.pathname.slice(1));
  }
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
export const Sidebar = compose(
  withRouter,
  connect<StateProps, DispatchProps, {}, RootState>(
    ({ sidebar: { active } }) => ({ active }),
    { setActiveSidebarItem }
  )
)(SidebarView) as React.ComponentType<any>;