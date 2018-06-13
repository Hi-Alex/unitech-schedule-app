import * as React from 'react';
import * as styles from './Item.scss'
import { cn } from '../../../../utils/className';
import { NavLink } from 'react-router-dom';

export interface ItemProps extends React.HTMLAttributes<HTMLAnchorElement>{
  to: string;
  icon?: string;
  Icon?: React.SFC<React.HTMLProps<SVGSVGElement>>;
  label?: string;
}

export class Item extends React.Component<ItemProps> {
  public static defaultProps: ItemProps = {
    to: '/',
    icon: '',
    label: 'Undefined',
  };

  render() {
    const { to, icon, Icon, label, className, ...other } = this.props;
    return (
      <NavLink
        {...other}
        to={to}
        activeClassName={styles.active}
        className={cn([styles.Item, className])}
      >
        {!Icon && icon && <img src={icon} className={styles.Icon} alt={label} />}
        {Icon && <Icon className={styles.Icon} />}
        <span>{label}</span>
      </NavLink>
    );
  }
}
