import * as React from "react";
import * as styles from "./Faculties.scss";
import * as GET_FACULTIES from './GET_FACULTIES.graphql';
import * as CREATE_FACULTY from './CREATE_FACULTY.graphql';
import { ModalHeading } from "../../components/Modal";
import { Label } from "../../components/Typography";
import { Input } from "../../components/UI/Input";
import { Button } from "../../components/UI/Button";
import { ModalContext } from "../../components/Modal";
import { Mutation } from 'react-apollo';

export interface CreateFacultyState {
  name: string;
}

export class CreateFaculty extends React.PureComponent<{}, CreateFacultyState> {
  state: CreateFacultyState = {
    name: '',
  };

  getListener<Key extends keyof CreateFacultyState>(key: Key) {
    return ({ currentTarget: { value } }) => this.setState({
      [key]: value
    } as any);
  }

  render() {
    const { name } = this.state;

    return (
      <>
        <ModalHeading>Добавление факультета</ModalHeading>
        <div className={styles.ModalContent}>
          <Label>Название</Label>
          <Input value={name} onChange={this.getListener("name")} placeholder="Без названия" />
          <ModalContext.Consumer>
            {({ close }) => (
              <Mutation mutation={CREATE_FACULTY} refetchQueries={[
                { query: GET_FACULTIES }
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
