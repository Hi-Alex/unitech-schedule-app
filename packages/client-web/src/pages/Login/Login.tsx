import * as React from 'react';
import { hot } from 'react-hot-loader';
import { RouteComponentProps } from 'react-router';
import * as styles from './Login.scss';
import { Heading, Input, Label } from "../../components";
import { Button } from "../../components/UI/Button";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export interface LoginState {
  login: string;
  password:string;
}

@hot(module)
export class Login extends React.Component<RouteComponentProps<any>> {
  state: LoginState = {
    login: '',
    password: ''
  };

  getListener<Key extends keyof LoginState>(key: Key) {
    return ({ currentTarget: { value } }) => this.setState({
      [key]: value
    } as any);
  }

  render() {
    const { login, password } = this.state;

    return (
      <div className={styles.Container}>
        <Heading type={3}>Вход</Heading>
        <div className={styles.Content}>
          <div className={styles.loginField}>
            <Label>Логин или email</Label>
            <Input value={login} onChange={this.getListener("login")} type='text' placeholder='email@example.com' />
          </div>
          <div className={styles.loginField}>
            <Label>Пароль</Label>
            <Input value={password} onChange={this.getListener("password")} type='password' placeholder='*******' />
          </div>
        </div>

        <Query
          query={gql`
          {
            user(id: 1) {
              firstName,
              lastName,
              password,
              photo
            }
          }
        `}
        >
          {({ error, loading, data }) => {
            if (error) {
              return null;
            }
            if (loading) {
              return <span>Загрузка...</span>
            }
            return  <Button onClick={() =>{ if(password==data.user.password && login == data.user.firstName){ this.props.history.push('/')}}}>Войти</Button>
          }}
        </Query>

        <a href='#'>Создать аккаунт</a>
      </div>
    );
  }
}
