import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Sidebar } from './components/Sidebar';
import { Select } from './components/UI/Select/Select';

export class Root extends React.Component {
  state = {
    type: 'select',
    label: 'Select Something',
    options: [
      { value: 'ass', label: 'Жопа' },
      { value: 'dick', label: 'Хрен' }
    ],
    value: 'dick'
  };
  render() {
    return (<Provider store={store}>
        <div>
          <Sidebar/>

          <Select label={this.state.label}
                  value={this.state.value}
                  options={this.state.options}
                  onChange={(value) => {
                    this.setState({value: value.target.value});
                    console.log(this.state);
                  }}/>
        </div>
      </Provider>
    );
  }
};
