import * as React from "react";
import * as GET_HOUSINGS from './GET_HOUSINGS.graphql';
import { hot } from "react-hot-loader";
import { Heading } from "../../components/Typography";
import { Query, QueryResult } from 'react-apollo';
import { IHousingAttributes } from "../../../../node-graphql/src/db/models";
import { GQLError } from "../../components/GraphQL";
import { PageActions } from "../internal/PageActions";
import { Button } from "../../components/UI/Button";
import { Modal } from "../../components/Modal";
import { CreateHousing } from "./CreateHousing";

export interface GetHousingsResult {
  housings: Array<IHousingAttributes>;
}

export interface HousingsState {
  creating: boolean;
}

@hot(module)
export class Housings extends React.Component<{}, HousingsState> {
  state: HousingsState = {
    creating: false
  };

  createSetter<Key extends keyof HousingsState>(key: Key, value: HousingsState[Key]) {
    return () => this.setState({
      [key]: value
    } as any);
  }

  render() {
    const { creating } = this.state;

    return (
      <>
        <PageActions>
          <Button onClick={this.createSetter('creating', true)}>Добавить корпус</Button>
          <Modal opened={creating} onClose={this.createSetter("creating", false)} variant="regular">
            {creating && <CreateHousing/>}
          </Modal>
        </PageActions>
        <Heading>Корпуса</Heading>
        <Query query={GET_HOUSINGS}>
          {({ error, data, loading }: QueryResult<GetHousingsResult>) => {
            if (loading) {
              return 'Подождите...';
            }
            if (error) {
              return <GQLError error={error} />;
            }
            if (data.housings.length === 0) {
              return <Heading type={3}>Нет корпусов</Heading>;
            }
            return (
              <div>
                {data.housings.map(({ id, name }) => (
                  <div key={id}>
                    {name}
                  </div>
                ))}
              </div>
            );
          }}
        </Query>
      </>
    );
  }
}
