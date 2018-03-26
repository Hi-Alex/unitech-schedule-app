import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { hot } from 'react-hot-loader';

let x = 0;

function Main({ children, history }: { children?: React.ReactNode } & RouteComponentProps<any>) {
  return (
    <div
      style={{
        width: 600,
        height: 600,
        padding: 100,
        backgroundColor: '#93ee5b'
      }}
      onClick={() => {
        history.push(`/test/${x % 4 === 0 ? '' : (x % 3 === 1 ? 'first' : (x % 2 === 1 ? 'second' : 'second/first'))}`);
        x++;
      }}
    >{children}</div>
  );
}

export default hot(module)(Main);
