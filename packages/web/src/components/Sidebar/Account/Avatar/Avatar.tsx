import * as React from 'react';
import * as styles from './Avatar.scss';

export const Avatar = (props) => (
  <div className={styles.Avatar}>
    <img src={props.src} alt={props.userName} />
  </div>
);