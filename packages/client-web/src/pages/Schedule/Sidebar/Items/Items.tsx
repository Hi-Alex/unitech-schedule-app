import * as React from 'react';
import { Item } from '../Item/Item';
import { map } from 'lodash';

export interface ItemsProps {
  items: {
    to: string;
    icon?: string;
    label?: string;
  }[];
}

export class Items extends React.Component<ItemsProps> {
  render() {
    const { items } = this.props;
    return (
      <div>
        {map(items, props => <Item key={props.to} {...props} />)}
      </div>
    );
  }
}