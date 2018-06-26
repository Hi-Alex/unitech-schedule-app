import * as React from "react";
import * as GET_FACULTIES from './GET_FACULTIES.graphql';
import { hot } from "react-hot-loader";
import { Heading } from "../../components/Typography";
import { Query, QueryResult } from 'react-apollo';
import { IFacultyAttributes } from "../../../../node-graphql/src/db/models";
import { GQLError } from "../../components/GraphQL";
import { PageActions } from "../internal/PageActions";
import { Button } from "../../components/UI/Button";
import { Modal } from "../../components/Modal";
import { CreateFaculty } from "./CreateFaculty";
import {ListItem} from "../../components/List/ListItem/ListItem";



export interface GetFacultiesResult {
  faculties: Array<IFacultyAttributes>;
}

export interface FacultiesState {
  creating: boolean;
}

@hot(module)
export class Faculties extends React.Component<{}, FacultiesState> {
  state: FacultiesState = {
    creating: false
  };

  createSetter<Key extends keyof FacultiesState>(key: Key, value: FacultiesState[Key]) {
    return () => this.setState({
      [key]: value
    } as any);
  }

  render() {
    const { creating } = this.state;

    return (
      <>
        <PageActions>
          <Button onClick={this.createSetter('creating', true)}>Добавить факультет</Button>
          <Modal opened={creating} onClose={this.createSetter("creating", false)} variant="regular">
            {creating && <CreateFaculty/>}
          </Modal>
        </PageActions>
        <Heading>Факультеты</Heading>
        <Query query={GET_FACULTIES}>
          {({ error, data, loading }: QueryResult<GetFacultiesResult>) => {
            if (loading) {
              return 'Подождите...';
            }
            if (error) {
              return <GQLError error={error} />;
            }
            if (data.faculties.length === 0) {
              return <Heading type={3}>Нет факультетов</Heading>;
            }
            return (
              <div>
                {data.faculties.map(({ id, name}) => (
                  <ListItem
                    key={id}
                    index={id}
                    items={[name]}
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
