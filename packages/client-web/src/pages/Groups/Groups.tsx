import * as React from "react";
import * as GET_GROUPS from './GET_GROUPS.graphql';
import { hot } from "react-hot-loader";
import { Heading } from "../../components/Typography";
import { Query, QueryResult } from 'react-apollo';
import { IGroupAttributes, IGroup } from "../../../../node-graphql/src/db/models";
import { GQLError } from "../../components/GraphQL";
import { PageActions } from "../internal/PageActions";
import { Button } from "../../components/UI/Button";
import { Modal } from "../../components/Modal";
import { CreateGroup } from "./CreateGroup";
import {ListItem} from "../../components/List/ListItem/ListItem";



export interface GetGroupsResult {
  groups: Array<IGroup>;
}

export interface GroupsState {
  creating: boolean;
}

@hot(module)
export class Groups extends React.Component<{}, GroupsState> {
  state: GroupsState = {
    creating: false
  };

  createSetter<Key extends keyof GroupsState>(key: Key, value: GroupsState[Key]) {
    return () => this.setState({
      [key]: value
    } as any);
  }

  render() {
    const { creating } = this.state;

    return (
      <>
        <PageActions>
          <Button onClick={this.createSetter('creating', true)}>Добавить группу</Button>
          <Modal opened={creating} onClose={this.createSetter("creating", false)} variant="regular">
            {creating && <CreateGroup/>}
          </Modal>
        </PageActions>
        <Heading>Группы</Heading>
        <Query query={GET_GROUPS}>
          {({ error, data, loading }: QueryResult<GetGroupsResult>) => {
            if (loading) {
              return 'Подождите...';
            }
            if (error) {
              return <GQLError error={error} />;
            }
            if ( data.groups.length === 0) {
              return <Heading type={3}>Нет групп</Heading>;
            }
            return (
              <div>
                {data.groups.map(({ id, year, number, studentsCount, speciality}) => (
                  <ListItem
                    key={id}
                    index={id}
                    items={[year, speciality && speciality.shortName, studentsCount]}
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
