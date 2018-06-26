import * as React from "react";
import * as styles from "./Groups.scss";
import * as GET_GROUPS from './GET_GROUPS.graphql';
import * as CREATE_GROUP from './CREATE_GROUP.graphql';
import { ModalHeading } from "../../components/Modal";
import { Label } from "../../components/Typography";
import { Input } from "../../components/UI/Input";
import { Button } from "../../components/UI/Button";
import { ModalContext } from "../../components/Modal";
import { Mutation } from 'react-apollo';
import { Omit } from "../../../../node-graphql/src/typings";
import { IGroup } from "../../../../node-graphql/src/db/models";
import { SpecialitiesSelect } from "../../containers/Selector/SpecialitiesSelect";


export interface CreateGroupState extends Omit<IGroup, 'id' | 'speciality'> {}

export class CreateGroup extends React.PureComponent<{}, CreateGroupState> {
  state: CreateGroupState = {
    year: 0,
    number: 1,
    studentsCount: 312,
    SpecialityId:0
  };

  getListener<Key extends keyof CreateGroupState>(key: Key) {
    return ({ currentTarget: { value } }) => this.setState({
      [key]: value
    } as any);
  }

  setSpecialityId = SpecialityId =>{
    this.setState({ SpecialityId })
  };

  render() {
    const { year, number, studentsCount, SpecialityId } = this.state;

    return (
      <>
        <ModalHeading>Добавление группу</ModalHeading>
        <div className={styles.ModalContent}>
          <Label>Год</Label>
          <Input value={year} type="number" onChange={this.getListener("year")} placeholder="Год не указан" />
          <Label>Номер</Label>
          <Input value={number} type="number" onChange={this.getListener("number")} placeholder="Номер не указан" />
          <Label>Количество студентов</Label>
          <Input value={studentsCount} type="number" onChange={this.getListener("studentsCount")} placeholder="Количество студентов не указано" />

          <Label>Cпециальность</Label>
          <SpecialitiesSelect onChange={this.setSpecialityId} selected={SpecialityId} />
          <ModalContext.Consumer>
            {({ close }) => (
              <Mutation mutation={CREATE_GROUP} refetchQueries={[
                { query: GET_GROUPS }
              ]} onCompleted={close}>
                {(createGroup, { loading }) => (
                  <Button disabled={loading} onClick={() => createGroup({
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
