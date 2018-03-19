import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { RouterOutlet } from './router/RouterOutlet';
import { routes } from './router';
import { BrowserRouter } from 'react-router-dom';

export class Root extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <RouterOutlet routes={routes}/>
        </Provider>
      </BrowserRouter>
    );
  }
};
