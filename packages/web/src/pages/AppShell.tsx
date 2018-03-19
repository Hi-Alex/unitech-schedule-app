import * as React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Select } from '../components/UI/Select/Select';
import { hot } from 'react-hot-loader';
import { RouteComponentProps, withRouter } from 'react-router';

@hot(module)
@(withRouter as any)
export default class AppShell extends React.Component<RouteComponentProps<any>> {
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
    return (
      <div>
        <Sidebar/>
        <Select
          label={this.state.label}
          value={this.state.value}
          options={this.state.options}
          onChange={(value) => {
            this.setState({ value: value.target.value });
            console.log(this.state);
          }}
        />
        <button style={{position: 'absolute', top: 0, right: 0}} onClick={() => {
          this.props.history.push('/login')
        }}>Выйти</button>
      </div>
    );
  }
}
