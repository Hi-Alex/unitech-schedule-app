import * as React from "react";
import * as styles from './Button.scss';
import { cn } from "../../../utils/className";

export function Button({ className, ...props }: React.HTMLProps<HTMLButtonElement>) {
  return <button className={cn([styles.Button, className])} {...props} />
}
