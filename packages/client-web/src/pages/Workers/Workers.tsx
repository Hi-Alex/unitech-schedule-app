import * as React from "react";
import * as GET_HOUSINGS from './GET_WORKERS.graphql';
import { hot } from "react-hot-loader";
import { Heading } from "../../components/Typography";
import { Query, QueryResult } from 'react-apollo';
import { IHousingAttributes, IWorker } from "../../../../node-graphql/src/db/models";
import { GQLError } from "../../components/GraphQL";
import { PageActions } from "../internal/PageActions";
import { Button } from "../../components/UI/Button";
import { Modal } from "../../components/Modal";
import { CreateWorker } from "./CreateWorker";
import {ListItem} from "../../components/List/ListItem/ListItem";
import {List} from "../../components/List/List"



export interface GetWorkerResult {
  workers: Array<IWorker>;
}

export interface WorkerState {
  creating: boolean;
}

@hot(module)
export class Workers extends React.Component<{}, WorkerState> {
  state: WorkerState = {
    creating: false
  };

  createSetter<Key extends keyof WorkerState>(key: Key, value: WorkerState[Key]) {
    return () => this.setState({
      [key]: value
    } as any);
  }

  render() {
    const { creating } = this.state;

    return (
      <>
        <PageActions>
          <Button onClick={this.createSetter('creating', true)}>Добавить преподавателя</Button>
          <Modal opened={creating} onClose={this.createSetter("creating", false)} variant="regular">
            {creating && <CreateWorker/>}
          </Modal>
        </PageActions>
        <Heading>Преподаватели</Heading>
        <Query query={GET_HOUSINGS}>
          {({ error, data, loading }: QueryResult<GetWorkerResult>) => {
            if (loading) {
              return 'Подождите...';
            }
            if (error) {
              return <GQLError error={error} />;
            }
            if (data.workers.length === 0) {
              return <Heading type={3}>Нет преподавателей</Heading>;
            }
            return (
              <div>
                {data.workers.map(({ id, firstName, lastName, position, faculty, cathedra}) => (
                  <ListItem
                    key={id}
                    index={id}
                    items={[firstName + ' ' + lastName,position, faculty && faculty.name, cathedra && cathedra.name]}
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
