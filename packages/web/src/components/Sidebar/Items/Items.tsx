import * as React from 'react';
import { Item } from '../Item/Item';
import { Dictionary } from '@secundant/tslib';
import { map } from 'lodash';

export interface ItemsProps {
  active: string;
  items: Dictionary<[string, string]>;
  onClick: (key: string) => any;
}

export class Items extends React.Component<ItemsProps>{
  render() {
    const { active, items, onClick } = this.props;
    return (
      <div>
        {map(items, ([icon, label], key) => (
          <Item
            active={active === key}
            key={key}
            icon={icon}
            label={label}
            onClick={() => onClick(label)}
          />
        ))}
      </div>
    );
  }
}