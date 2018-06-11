import * as React from 'react';
import { hot } from 'react-hot-loader';
import { RouteComponentProps } from 'react-router';
import * as styles from './Login.scss';
import { Heading, Input, Label } from "../../components";

@hot(module)
export class Login extends React.Component<RouteComponentProps<any>> {
  render() {
    return (
      <div className={styles.Container}>
        <Heading type={3}>Вход</Heading>
        <div className={styles.Content}>
          <div className={styles.loginField}>
            <Label>Логин или email</Label>
            <Input type='text' placeholder='email@example.com' />
          </div>
          <div className={styles.loginField}>
            <Label>Пароль</Label>
            <Input type='password' placeholder='*******' />
          </div>
        </div>
        <button onClick={() => this.props.history.push('/')}>Войти</button>
        <a href='#'>Создать аккаунт</a>
      </div>
    );
  }
}
