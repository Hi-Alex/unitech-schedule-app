import * as React from "react";
import * as styles from './Typography.scss';
import { Omit } from "ramda";
import { cn } from "../../utils/className";

export type HeadingType = 1 | 2 | 3 | 4 | 5 | 6;
export interface HeadingProps extends Omit<React.HTMLProps<HTMLHeadingElement>, 'type'> {
  type?: HeadingType;
}

export function Heading({ type, className, ...props }: HeadingProps) {
  const Component = `h${type || 1}`;

  return React.createElement(Component, {
    ...props,
    className: cn([styles[`Heading-${type || 1}`], className])
  });
}

export function Label({ className, ...props }: React.HTMLProps<HTMLLabelElement>) {
  return <label {...props} className={cn([styles.Label, className])}/>;
}
