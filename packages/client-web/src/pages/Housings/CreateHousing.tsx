import * as React from "react";
import * as styles from "./Housings.scss";
import * as GET_HOUSINGS from './GET_HOUSINGS.graphql';
import * as CREATE_HOUSING from './CREATE_HOUSING.graphql';
import { WeekDay } from "../../../../node-graphql/src/db/enums";
import { ModalHeading } from "../../components/Modal";
import { Label } from "../../components/Typography";
import { Input } from "../../components/UI/Input";
import { Button } from "../../components/UI/Button";
import { ModalContext } from "../../components/Modal";
import { Mutation } from 'react-apollo';

export interface CreateHousingState {
  name: string;
  address: string;
  floors: number;
  workTime: WeekDay[];
}

export class CreateHousing extends React.PureComponent<{}, CreateHousingState> {
  state: CreateHousingState = {
    floors: 3,
    address: '',
    name: '',
    workTime: []
  };

  getListener<Key extends keyof CreateHousingState>(key: Key) {
    return ({ currentTarget: { value } }) => this.setState({
      [key]: value
    } as any);
  }

  render() {
    const { name, address, floors } = this.state;

    return (
      <>
        <ModalHeading>Добавление корпуса</ModalHeading>
        <div className={styles.ModalContent}>
          <Label>Название</Label>
          <Input value={name} onChange={this.getListener("name")} placeholder="Без названия" />
          <Label>Адрес</Label>
          <Input value={address} onChange={this.getListener("address")} placeholder="Адрес не указан" />
          <Label>Этажность</Label>
          <Input value={floors} type="number" onChange={this.getListener("floors")} placeholder="Этажность не указана" />
          <ModalContext.Consumer>
            {({ close }) => (
              <Mutation mutation={CREATE_HOUSING} refetchQueries={[{
                query: GET_HOUSINGS
              }]} onCompleted={close}>
                {(createHousing, { loading }) => (
                  <Button disabled={loading} onClick={() => createHousing({
                    variables: {
                      data: this.state
                    }
                  })}>Добавить</Button>
                )}
              </Mutation>
            )}
          </ModalContext.Consumer>
        </div>
      </>
    );
  }
}
