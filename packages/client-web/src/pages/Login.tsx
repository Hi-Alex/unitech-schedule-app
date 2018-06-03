import * as React from 'react';
import { hot } from 'react-hot-loader';
import { RouteComponentProps } from 'react-router';
import * as styles from './Login.scss';

@hot(module)
export default class Login extends React.Component<RouteComponentProps<any>> {
  render() {
    return (
      <div className={styles.loginContainer}>
        <h1>Вход</h1>
        <div className={styles.loginField}>
          <label>Логин или email</label>
          <input type='text' placeholder='email.example.com' name='login'/>
        </div>
        <div className={styles.loginField}>
          <label>Пароль</label>
          <input type='password' placeholder='*******' name='password'/>
        </div>
        <button onClick={() => this.props.history.push('/')}>Войти</button>
        <a href='#'>Создать аккаунт</a>
      </div>
    );
  }
}
