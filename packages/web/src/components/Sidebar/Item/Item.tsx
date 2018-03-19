import * as React from 'react';
import * as styles from './Item.scss'
import { cn } from '../../../utils/className';

export interface ItemProps extends React.HTMLAttributes<HTMLDivElement>{
  icon?: string;
  label?: string;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export class Item extends React.Component<ItemProps> {
  public static defaultProps: ItemProps = {
    icon: '',
    label: 'Undefined',
    active: false,
    onClick: null
  };

  render() {
    const { icon, label, active, onClick, className, ...other } = this.props;
    return (
      <div
        {...other}
        className={cn([styles.Item, active && styles.active, className])}
        onClick={onClick}
      >{label}</div>
    );
  }
}
