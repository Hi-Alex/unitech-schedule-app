import * as React from 'react';
import { Avatar } from './Avatar/Avatar';
import * as styles from './Account.scss'
import * as avatar from '../avatar2.jpg';
import { Query } from "react-apollo";
import gql from "graphql-tag";

export interface AccountProps {
  firstName?: string;
  lastName?: string;
}

class AccountView extends React.Component<AccountProps> {
  render() {
    const { firstName, lastName } = this.props;

    return (
      <div className={styles.Account}>
        <Avatar src={avatar}/>
        <p>{firstName} {lastName}</p>
      </div>
    );
  }
}

export const Account = () => (
  <Query
    query={gql`
      {
        user(id: 1) {
          firstName,
          lastName
        }
      }
    `}
  >
    {({ error, loading, data }) => {
        if (error) {
          return (
            <span>Рип</span>
          );
        }
        if (loading) {
          return <span>loading</span>
        }
        return <AccountView {...data.user} />
    }}
  </Query>
);
