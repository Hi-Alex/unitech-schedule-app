import * as React from 'react';
import { Sidebar } from '../components/Sidebar';
import { hot } from 'react-hot-loader';
import { Page } from './internal/Page';

@hot(module)
export default class AppShell extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Sidebar/>
        <Page>{this.props.children}</Page>
      </React.Fragment>
    );
  }
}
