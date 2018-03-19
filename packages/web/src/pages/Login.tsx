import * as React from 'react';
import { hot } from 'react-hot-loader';
import { RouteComponentProps, withRouter } from 'react-router';

@hot(module)
@(withRouter as any)
export default class Login extends React.Component<RouteComponentProps<any>> {
  render() {
    return (
      <div>
        <h1>Login page</h1>
        <button onClick={() => this.props.history.push('/')}>Войти</button>
      </div>
    );
  }
}
