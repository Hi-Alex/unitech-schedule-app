import * as React from "react";
import * as GET_SPECIALITIES from './GET_SPECIALITIES.graphql';
import { hot } from "react-hot-loader";
import { compact } from 'lodash';
import { Heading } from "../../components/Typography";
import { Query, QueryResult } from 'react-apollo';
import { ISpeciality } from "../../../../node-graphql/src/db/models";
import { GQLError } from "../../components/GraphQL";
import { PageActions } from "../internal/PageActions";
import { Button } from "../../components/UI/Button";
import { Modal } from "../../components/Modal";
import { CreateSpeciality } from "./CreateSpeciality";
import {ListItem} from "../../components/List/ListItem/ListItem";



export interface GetFacultiesResult {
  specialities: ISpeciality[];
}

export interface SpecialitiesState {
  creating: boolean;
}

@hot(module)
export class Specialities extends React.Component<{}, SpecialitiesState> {
  state: SpecialitiesState = {
    creating: false
  };

  createSetter<Key extends keyof SpecialitiesState>(key: Key, value: SpecialitiesState[Key]) {
    return () => this.setState({
      [key]: value
    } as any);
  }

  render() {
    const { creating } = this.state;

    return (
      <>
        <PageActions>
          <Button onClick={this.createSetter('creating', true)}>Добавить специальность</Button>
          <Modal opened={creating} onClose={this.createSetter("creating", false)} variant="regular">
            {creating && <CreateSpeciality/>}
          </Modal>
        </PageActions>
        <Heading>Cпециальности</Heading>
        <Query query={GET_SPECIALITIES}>
          {({ error, data, loading }: QueryResult<GetFacultiesResult>) => {
            if (loading) {
              return 'Подождите...';
            }
            if (error) {
              return <GQLError error={error} />;
            }
            if ( data.specialities.length === 0) {
              return <Heading type={3}>Нет специальностей</Heading>;
            }
            return (
              <div>
                {data.specialities.map(({ id, name, shortName, code, faculty }) => (
                  <ListItem
                    key={id}
                    index={id}
                    items={compact([name, shortName, code, faculty && faculty.name])}
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
