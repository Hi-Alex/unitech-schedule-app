import * as React from 'react';
import { Avatar } from './Avatar/Avatar';
import * as styles from './Account.scss'

export class Account extends React.Component {
  render() {
    return (
      <div className={styles.Account}>
        <Avatar
          avatarSrc="https://pp.userapi.com/c639129/v639129109/1b318/Yl7dOIqpeLI.jpg"
          userName="Аббасова Татьяна"
        />
        <p>Аббасова Татьяна</p>
      </div>
    );
  }
}