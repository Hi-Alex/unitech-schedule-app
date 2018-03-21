import * as React from 'react';
import { Sidebar } from '../components/Sidebar';
import { hot } from 'react-hot-loader';
import { Page } from './internal/Page';
import { RouteComponentProps } from 'react-router';

const BG_WHITE_EXP = /^\/schedule/;
const BG_WHITE = {
  backgroundColor: '#fff'
};

@hot(module)
export default class AppShell extends React.Component<RouteComponentProps<any>> {
  render(): React.ReactNode {
    const { pathname } = this.props.location;

    return (
      <React.Fragment>
        <Sidebar/>
        <Page
          style={BG_WHITE_EXP.test(pathname) ? BG_WHITE : {}}
        >{this.props.children}</Page>
      </React.Fragment>
    );
  }
}
