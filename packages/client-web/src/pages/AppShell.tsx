import * as React from 'react';
import * as GET_USER from './GET_USER.graphql';
import { Sidebar } from './Schedule/Sidebar';
import { hot } from 'react-hot-loader';
import { Page } from './internal/Page';
import { RouteComponentProps } from 'react-router';
import { Query, QueryResult } from 'react-apollo';
import { Provider } from './rootContext';
import { Heading } from "../components";

const UNSIGNED_EXP = /^\/login/;
const BG_WHITE_EXP = /^\/schedule/;
const BG_WHITE = {
  backgroundColor: '#fff',
  paddingBottom: 0
};

@hot(module)
export default class AppShell extends React.Component<RouteComponentProps<any>> {
  render(): React.ReactNode {
    const { location: { pathname }, history: { replace } } = this.props;

    return (
      <Query query={GET_USER}>
        {({ data, loading, error }: QueryResult) => {
          if (!loading && !data.user && !UNSIGNED_EXP.test(pathname)) {
            replace('/login');
            return null;
          }
          if (error) {
            return (
              <React.Fragment>
                <Heading>[{error.name}] - {error.message}</Heading>
                {error.graphQLErrors.map(({ name, message, stack, path }, index) => (
                  <React.Fragment key={index}>
                    <Heading type={2}>[{name}, {path}] - {message}</Heading>
                    {stack}
                  </React.Fragment>
                ))}
              </React.Fragment>
            );
          }

          return (
            <Provider
              value={{
                user: data.user
              }}
            >
              <Sidebar/>
              <Page
                style={BG_WHITE_EXP.test(pathname) ? BG_WHITE : {}}
              >{this.props.children}</Page>
            </Provider>
          )
        }}
      </Query>
    );
  }
}
