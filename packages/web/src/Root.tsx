import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Sidebar } from './components/Sidebar';
import { Items } from './components/Sidebar/Items/Items';

export const Root:React.StatelessComponent = () => (
  <Provider store={store}>
    <Items active={'group'}
           items={{
             schedule: ['', 'Расписание']
           }} onClick={(key)=>console.log(key)}/>
  </Provider>
);
