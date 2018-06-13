import * as React from 'react';
import { RouterOutlet } from './router/RouterOutlet';
import { routes } from './router';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { ApolloProvider } from "react-apollo";
import { client } from "./apollo-client";

@hot(module)
export class Root extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <RouterOutlet routes={routes}/>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}
