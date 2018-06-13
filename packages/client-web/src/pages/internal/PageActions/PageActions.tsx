import * as React from "react";
import * as styles from './PageActions.scss';
import { cn } from "../../../utils/className";

export class PageActions extends React.PureComponent<React.HTMLProps<HTMLDivElement>> {
  render() {
    const { className, ...props } = this.props;

    return <div className={cn([styles.PageActions, className])} {...props} />;
  }
}
