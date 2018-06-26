import * as React from "react";
import * as styles from "./Cathedras.scss";
import * as GET_CATHEDRAS from './GET_CATHEDRAS.graphql';
import * as CREATE_CATHEDRA from './CREATE_CATHEDRA.graphql';
import { ModalHeading } from "../../components/Modal";
import { Label } from "../../components/Typography";
import { Input } from "../../components/UI/Input";
import { Button } from "../../components/UI/Button";
import { ModalContext } from "../../components/Modal";
import { Mutation } from 'react-apollo';
import { Omit } from "../../../../node-graphql/src/typings";
import { ICathedra } from "../../../../node-graphql/src/db/models";
import { FacultiesSelect } from "../../containers/Selector/FacultiesSelect";


export interface CreateCathedraState extends Omit<ICathedra, 'id' | 'faculty'> {}

export class CreateCathedra extends React.PureComponent<{}, CreateCathedraState> {
  state: CreateCathedraState = {
    name: '',
    FacultyId: 0
  };

  getListener<Key extends keyof CreateCathedraState>(key: Key) {
    return ({ currentTarget: { value } }) => this.setState({
      [key]: value
    } as any);
  }

  setFacultyId = FacultyId =>{
    console.log()
    this.setState({ FacultyId })
  };

  render() {
    const { name,FacultyId } = this.state;

    return (
      <>
        <ModalHeading>Добавление кафедры</ModalHeading>
        <div className={styles.ModalContent}>
          <Label>Название</Label>
          <Input value={name} onChange={this.getListener("name")} placeholder="Без названия" />
          <Label>Факультет</Label>
          <FacultiesSelect onChange={this.setFacultyId} selected={FacultyId} />
          <ModalContext.Consumer>
            {({ close }) => (
              <Mutation mutation={CREATE_CATHEDRA} refetchQueries={[
                { query: GET_CATHEDRAS }
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
