import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { RouterOutlet } from './router/RouterOutlet';
import { routes } from './router';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { ApolloProvider } from "react-apollo";
import { client } from "./graphql";

@hot(module)
export class Root extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <RouterOutlet routes={routes}/>
          </ApolloProvider>
        </Provider>
      </BrowserRouter>
    );
  }
};
