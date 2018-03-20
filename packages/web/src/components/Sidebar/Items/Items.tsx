import * as React from 'react';
import { Item } from '../Item/Item';
import { Dictionary } from '@secundant/tslib';
import { map } from 'lodash';

export interface ItemsProps {
  items: {
    to: string;
    icon?: string;
    label?: string;
  }[];
}

export class Items extends React.Component<ItemsProps>{
  render() {
    const { items } = this.props;
    return (
      <div>
        {map(items, ({to,icon,label}) => (
          <Item
            to={to}
            key={to}
            icon={icon}
            label={label}
          />
        ))}
      </div>
    );
  }
}