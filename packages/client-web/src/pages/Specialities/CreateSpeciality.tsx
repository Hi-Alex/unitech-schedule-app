import * as React from "react";
import * as styles from "./Specialities.scss";
import * as GET_SPECIALITIES from './GET_SPECIALITIES.graphql';
import * as CREATE_SPECIALITY from './CREATE_SPECIALITY.graphql';
import { ModalHeading } from "../../components/Modal";
import { Label } from "../../components/Typography";
import { Input } from "../../components/UI/Input";
import { Button } from "../../components/UI/Button";
import { ModalContext } from "../../components/Modal";
import { Mutation } from 'react-apollo';
import { FacultiesSelect } from "../../containers/Selector/FacultiesSelect";
import { Omit } from "../../../../node-graphql/src/typings";
import { ISpeciality } from "../../../../node-graphql/src/db/models";

export interface CreateSpecialityState extends Omit<ISpeciality, 'id' | 'faculty'> {}

export class CreateSpeciality extends React.PureComponent<{}, CreateSpecialityState> {
  state: CreateSpecialityState = {
    name: '',
    shortName: '',
    code: ''
  };

  getListener<Key extends keyof CreateSpecialityState>(key: Key) {
    return ({ currentTarget: { value } }) => this.setState({
      [key]: value
    } as any);
  }

  setFacultyId = FacultyId => this.setState({ FacultyId });

  render() {
    const { name, shortName, code, FacultyId } = this.state;

    return (
      <>
        <ModalHeading>Добавление специальности</ModalHeading>
        <div className={styles.ModalContent}>
          <Label>Название</Label>
          <Input value={name} onChange={this.getListener("name")} placeholder="Без названия" />
          <Label>Короткое название</Label>
          <Input value={shortName} onChange={this.getListener("shortName")} placeholder="Без названия" />
          <Label>Код</Label>
          <Input value={code} onChange={this.getListener("code")} placeholder="Введите код" />
          <Label>Факультет</Label>
          <FacultiesSelect onChange={this.setFacultyId} selected={FacultyId} />
          <ModalContext.Consumer>
            {({ close }) => (
              <Mutation mutation={CREATE_SPECIALITY} refetchQueries={[
                { query: GET_SPECIALITIES }
              ]} onCompleted={close}>
                {(createSpeciality, { loading }) => (
                  <Button disabled={loading} onClick={() => createSpeciality({
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
