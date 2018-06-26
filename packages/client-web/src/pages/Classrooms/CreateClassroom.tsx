import * as React from "react";
import * as styles from "./Classrooms.scss";
import * as GET_CLASSROOMS from './GET_CLASSROOMS.graphql';
import * as CREATE_CLASSROOM from './CREATE_CLASSROOM.graphql';
import { ModalHeading } from "../../components/Modal";
import { Label } from "../../components/Typography";
import { Input } from "../../components/UI/Input";
import { Button } from "../../components/UI/Button";
import { ModalContext } from "../../components/Modal";
import { Mutation } from 'react-apollo';
import { Omit } from "../../../../node-graphql/src/typings";
import { IClassroom } from "../../../../node-graphql/src/db/models";
import { FacultiesSelect } from "../../containers/Selector/FacultiesSelect";
import { HousingsSelect } from "../../containers/Selector";


export interface CreateClassroomState extends Omit<IClassroom, 'id' | 'housing'> {}

export class CreateClassroom extends React.PureComponent<{}, CreateClassroomState> {
  state: CreateClassroomState = {
    floor: 0,
    number: '',
    capacity: 0,
    HousingId: 0
  };

  getListener<Key extends keyof CreateClassroomState>(key: Key) {
    return ({ currentTarget: { value } }) => this.setState({
      [key]: value
    } as any);
  }

  setHousingId = HousingId =>{
    this.setState({ HousingId })
  };

  render() {
    const { floor, number, capacity, HousingId } = this.state;

    return (
      <>
        <ModalHeading>Добавление кафедры</ModalHeading>
        <div className={styles.ModalContent}>
          <Label>Этаж</Label>
          <Input type="number" value={floor} onChange={this.getListener("floor")} placeholder="Без названия" />
          <Label>Номер</Label>
          <Input value={number} onChange={this.getListener("number")} placeholder="Введите номер" />
          <Label>Вместимость(чел.)</Label>
          <Input value={capacity} onChange={this.getListener("capacity")} placeholder="Без названия" />
          <Label>Корпус</Label>
          <HousingsSelect onChange={this.setHousingId} selected={HousingId} />
          <ModalContext.Consumer>
            {({ close }) => (
              <Mutation mutation={CREATE_CLASSROOM} refetchQueries={[
                { query: GET_CLASSROOMS }
              ]} onCompleted={close}>
                {(createFaculty, { loading }) => (
                  <Button disabled={loading} onClick={() => createFaculty({
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
