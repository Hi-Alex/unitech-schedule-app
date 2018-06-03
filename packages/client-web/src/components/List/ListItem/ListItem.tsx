import * as React from 'react';
import ListItemColumn from '../ListItemColumn/ListItemColumn';
import * as styles from './ListItem.scss'
import { Dictionary } from '@secundant/tslib';
import { map } from 'lodash';

export interface ItemsProps {
  active?: boolean;
  index: string | number;
  items: string[];
  onClick?: (key: string) => any;
}

export default class ListItem extends React.Component<ItemsProps>{
  render() {
    const {index, items, onClick } = this.props;
    return (
      <div className={styles.ListItem}>
        {map(items, (text, key) => (
          <ListItemColumn
            key={key}
            text={text}
          />
        ))}
      </div>
    );
  }
}