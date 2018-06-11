import * as React from "react";
import * as styles from './Input.scss';
import { cn } from "../../../utils/className";

export interface InputProps extends React.HTMLProps<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return <input className={cn([styles.Input, className])} {...props} />
}
