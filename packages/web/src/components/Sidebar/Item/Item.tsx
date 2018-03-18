import * as React from 'react';
import { on } from 'cluster';

export interface ItemProps {
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
    const { icon, label, active, onClick } = this.props;
    return (
      <div onClick={onClick}>{label}</div>
    );
  }
}
