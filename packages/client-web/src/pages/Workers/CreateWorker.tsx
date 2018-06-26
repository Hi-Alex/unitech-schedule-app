import * as React from "react";
import * as styles from "./Workers.scss";
import * as GET_WORKERS from './GET_WORKERS.graphql';
import * as CREATE_WORKER from './CREATE_WORKER.graphql';
import { WeekDay } from "../../../../node-graphql/src/db/enums";
import { ModalHeading } from "../../components/Modal";
import { Label } from "../../components/Typography";
import { Input } from "../../components/UI/Input";
import { Button } from "../../components/UI/Button";
import { ModalContext } from "../../components/Modal";
import { Mutation } from 'react-apollo';
import { IWorker } from "../../../../node-graphql/src/db/models";
import { CathedrasSelect, FacultiesSelect } from "../../containers/Selector/";
import { Omit } from "../../../../node-graphql/src/typings";

export interface CreateWorkerState extends Omit<IWorker, 'id' | 'faculty'> {}

export class CreateWorker extends React.PureComponent<{}, CreateWorkerState> {
  state: CreateWorkerState = {
    firstName: '',
    lastName: '',
    position: '',
    FacultyId: 0,
    CathedraId: 0
  };

  getListener<Key extends keyof CreateWorkerState>(key: Key) {
    return ({ currentTarget: { value } }) => this.setState({
      [key]: value
    } as any);
  }

  setFacultyId = FacultyId =>{
    console.log()
    this.setState({ FacultyId })
  };

  setCathedraId = CathedraId =>{
    console.log()
    this.setState({ CathedraId })
  };

  render() {
    const { firstName, lastName, position, FacultyId, CathedraId } = this.state;

    return (
      <>
        <ModalHeading>Добавление преподавателя</ModalHeading>
        <div className={styles.ModalContent}>
          <Label>Имя</Label>
          <Input value={firstName} onChange={this.getListener("firstName")} placeholder="Без названия" />
          <Label>Фамилия</Label>
          <Input value={lastName} onChange={this.getListener("lastName")} placeholder="Без названия" />
          <Label>Позиция</Label>
          <Input value={position} onChange={this.getListener("position")} placeholder="Без названия" />
          <Label>Факультет</Label>
          <FacultiesSelect onChange={this.setFacultyId} selected={FacultyId} />
          <Label>Кафедра</Label>
          <CathedrasSelect onChange={this.setCathedraId} selected={CathedraId}/>
          <ModalContext.Consumer>
            {({ close }) => (
              <Mutation mutation={CREATE_WORKER} refetchQueries={[{
                query: GET_WORKERS
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
