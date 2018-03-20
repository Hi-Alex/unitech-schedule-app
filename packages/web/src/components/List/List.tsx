import * as React from 'react';
import ListItem from './ListItem/ListItem';
import * as styles from './List.scss'
import { Dictionary } from '@secundant/tslib';
import { map } from 'lodash';

export interface ItemsProps {
  //items: Dictionary<[any]>;
  active?: string;
  items: string[][];
  onClick?: (key: string) => any;
}

export class List extends React.Component<ItemsProps>{
  render() {
    const { items, onClick } = this.props;
    console.log("List", items);
    return (
      <div className={styles.List}>
        {map(items, (item, key) => {
         console.log("ListItem:", item, key);
          return(  <ListItem
            key={key}
            index={key}
            items={item}
          />);
        })}
      </div>
    );
  }
}