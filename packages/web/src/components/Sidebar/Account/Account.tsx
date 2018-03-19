import * as React from 'react';
import { Avatar } from './Avatar/Avatar';
import * as styles from './Account.scss'
import * as avatar from '../avatar.jpg';

export class Account extends React.Component {
  render() {
    return (
      <div className={styles.Account}>
        <Avatar
          src={avatar}
          userName="Аббасова Татьяна"
        />
        <p>Аббасова Татьяна</p>
      </div>
    );
  }
}