import * as React from 'react';
import { cn } from '../../../utils/className';
import * as styles from './Page.scss';

export const Page = (
  { className, ...props}: React.HTMLAttributes<HTMLDivElement>
) => <div {...props} className={cn([styles.Page, className])} />;
