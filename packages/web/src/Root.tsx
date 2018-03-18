import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

export const Root = () => (
  <Provider store={store}>
    
  </Provider>
);
