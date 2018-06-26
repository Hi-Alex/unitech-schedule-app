import * as React from "react";
import * as GET_CATHEDRAS from './GET_CATHEDRAS.graphql';
import { hot } from "react-hot-loader";
import { Heading } from "../../components/Typography";
import { Query, QueryResult } from 'react-apollo';
import { ICathedraAttributes, IFacultyAttributes } from "../../../../node-graphql/src/db/models";
import { GQLError } from "../../components/GraphQL";
import { PageActions } from "../internal/PageActions";
import { Button } from "../../components/UI/Button";
import { Modal } from "../../components/Modal";
import { CreateCathedra } from "./CreateCathedra";
import {ListItem} from "../../components/List/ListItem/ListItem";



export interface GetCathedrasResult {
  cathedras: Array<ICathedraAttributes>;
}

export interface CathedrasState {
  creating: boolean;
}

@hot(module)
export class Cathedras extends React.Component<{}, CathedrasState> {
  state: CathedrasState = {
    creating: false
  };

  createSetter<Key extends keyof CathedrasState>(key: Key, value: CathedrasState[Key]) {
    return () => this.setState({
      [key]: value
    } as any);
  }

  render() {
    const { creating } = this.state;

    return (
      <>
        <PageActions>
          <Button onClick={this.createSetter('creating', true)}>Добавить кафедру</Button>
          <Modal opened={creating} onClose={this.createSetter("creating", false)} variant="regular">
            {creating && <CreateCathedra/>}
          </Modal>
        </PageActions>
        <Heading>Кафедры</Heading>
        <Query query={GET_CATHEDRAS}>
          {({ error, data, loading }: QueryResult<GetCathedrasResult>) => {
            if (loading) {
              return 'Подождите...';
            }
            if (error) {
              return <GQLError error={error} />;
            }
            if ( data.cathedras.length === 0) {
              return <Heading type={3}>Нет кафедр</Heading>;
            }
            return (
              <div>
                {data.cathedras.map(({ id, name, faculty}) => (
                  <ListItem
                    key={id}
                    index={id}
                    items={[name, faculty && faculty.name]}
                  />

                ))}
              </div>
            );
          }}
        </Query>
      </>
    );
  }
}
