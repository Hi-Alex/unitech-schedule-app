import * as React from 'react';
import { cn } from '../../../utils/className';
import * as styles from './ListItemColumn.scss'

export interface ListItemColumnProps extends React.HTMLAttributes<HTMLDivElement>{
  text?: string;
}

export default class ListItemColumn extends React.Component<ListItemColumnProps> {
  render() {
    const { text, className, ...other } = this.props;
    return (
      <div
        {...other}
        className={cn([styles.ListItemColumn, className])}
      >
        <span>{text}</span>
      </div>
    );
  }
}