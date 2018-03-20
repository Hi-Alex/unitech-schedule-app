import * as React from 'react';
import * as styles from './Item.scss'
import { cn } from '../../../utils/className';
import { NavLink } from 'react-router-dom';

export interface ItemProps extends React.HTMLAttributes<HTMLAnchorElement>{
  to: string;
  icon?: string;
  label?: string;
}

export class Item extends React.Component<ItemProps> {
  public static defaultProps: ItemProps = {
    to: '/',
    icon: '',
    label: 'Undefined',
  };

  render() {
    const { to, icon, label, className, ...other } = this.props;
    return (
      <NavLink
        {...other}
        to={to}
        activeClassName={styles.active}
        className={cn([styles.Item, className])}
      >
        <img src={icon} alt={label} />
        <span>{label}</span>
      </NavLink>
    );
  }
}
