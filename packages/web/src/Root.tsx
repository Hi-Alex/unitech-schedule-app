import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Sidebar } from './components/Sidebar';

export const Root = () => (
  <Provider store={store}>

  </Provider>
);
