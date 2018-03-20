import * as React from 'react';
import { hot } from 'react-hot-loader';
import { cn } from '../utils/className';
import { List } from '../components/List/List';
import ListItem from '../components/List/ListItem/ListItem';

const list:any = {
  abbas: ['Аббасова Татьяна Сергеевна', 'Доцент', 'Кафедра ИБ', '+7(977) 555-35-35' ],
  hj: ['Штрафина Елена Дмитриевна', 'Доцент', 'Кафедра ИТУС', '+7(977) 555-35-35' ]
};

/*const list = {
{d:{d:["dsf"]}}.
{"fsdfsf"}
};*/

@hot(module)
export default class Lists extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Списки</h1>
        <List items={list}/>
      </React.Fragment>
    );
  }
}
