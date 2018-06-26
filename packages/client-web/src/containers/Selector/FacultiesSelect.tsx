import * as React from "react";
import * as GET_FACULTIES from '../../pages/Faculties/GET_FACULTIES.graphql';
import { Query } from 'react-apollo';
import { Select } from "../../components/UI/Select/index";
import { IFacultyAttributes } from "../../../../node-graphql/src/db/models/index";

export interface FacultiesSelectProps {
  onChange(facultyId: number): any;
  selected?: number;
}

const toOptions = (faculties: IFacultyAttributes[]) => faculties.reduce((value, { id, name }) => {
  value[id] = name;
  return value;
}, {}) as any;

export function FacultiesSelect({ onChange, selected }: FacultiesSelectProps) {
  return (
    <Query
      query={GET_FACULTIES}
    >
      {({ loading, data }) => (
        <Select
          options={toOptions(data && data.faculties ? data.faculties : [])}
          selected={selected}
          onChange={onChange as any}
        />
      )}
    </Query>
  )
}
