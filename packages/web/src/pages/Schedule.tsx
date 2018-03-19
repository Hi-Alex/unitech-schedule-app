import * as React from 'react';
import { hot } from 'react-hot-loader';

const from = (count, fn) => new Array(count)
  .fill(0)
  .map((_, i) => fn(i));

@hot(module)
export default class Schedule extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Расписание</h1>
        <table cellSpacing={6} cellPadding={10}>
          <tbody>
          {from(20, key => (
            <tr key={key}>
              {from(10, tdKey => (
                <td key={tdKey}>{key * 20 + tdKey}</td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
