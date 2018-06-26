import * as React from "react";
import * as GET_CLASSROOMS from './GET_CLASSROOMS.graphql';
import { hot } from "react-hot-loader";
import { Heading } from "../../components/Typography";
import { Query, QueryResult } from 'react-apollo';
import { IClassroom } from "../../../../node-graphql/src/db/models";
import { GQLError } from "../../components/GraphQL";
import { PageActions } from "../internal/PageActions";
import { Button } from "../../components/UI/Button";
import { Modal } from "../../components/Modal";
import { CreateClassroom } from "./CreateClassroom";
import {ListItem} from "../../components/List/ListItem/ListItem";




export interface GetClassroomsResult {
  classrooms: Array<IClassroom>;
}

export interface ClassroomsState {
  creating: boolean;
}

@hot(module)
export class Classrooms extends React.Component<{}, ClassroomsState> {
  state: ClassroomsState = {
    creating: false
  };

  createSetter<Key extends keyof ClassroomsState>(key: Key, value: ClassroomsState[Key]) {
    console.log("HIO");
    return () => this.setState({
      [key]: value
    } as any);
  }

  render() {
    const { creating } = this.state;
    return (
      <>
        <PageActions>
          <Button onClick={this.createSetter('creating', true)}>Добавить аудиторию</Button>
          <Modal opened={creating} onClose={this.createSetter("creating", false)} variant="regular">
            {creating && <CreateClassroom/>}
          </Modal>
        </PageActions>
        <Heading>Аудитории</Heading>
        <Query query={GET_CLASSROOMS}>
          {({ error, data, loading }: QueryResult<GetClassroomsResult>) => {
            if (loading) {
              return 'Подождите...';
            }
            if (error) {
              return <GQLError error={error} />;
            }
            if ( data.classrooms.length === 0) {
              return <Heading type={3}>Нет аудиторий</Heading>;
            }
            return (
              <div>
                {data.classrooms.map(({ id, floor, number, capacity, housing}) => (
                  <ListItem
                    key={id}
                    index={id}
                    items={[number, floor, capacity, housing && housing.name]}
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
