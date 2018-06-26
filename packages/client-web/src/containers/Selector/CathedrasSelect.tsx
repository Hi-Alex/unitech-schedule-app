import * as React from "react";
import * as GET_CATHEDRAS from '../../pages/Cathedras/GET_CATHEDRAS.graphql';
import { Query } from 'react-apollo';
import { Select } from "../../components/UI/Select/index";
import { ICathedra } from "../../../../node-graphql/src/db/models/index";

export interface CathedraSelectProps {
  onChange(cathedraId: number): any;
  selected?: number;
}

const toOptions = (specialities: ICathedra[]) => specialities.reduce((value, { id, name }) => {
  value[id] = name;
  return value;
}, {}) as any;

export function CathedrasSelect({ onChange, selected }: CathedraSelectProps) {
  return (
    <Query
      query={GET_CATHEDRAS}
    >
      {({ loading, data }) => (
        <Select
          options={toOptions(data && data.cathedras ? data.cathedras : [])}
          selected={selected}
          onChange={onChange as any}
        />
      )}
    </Query>
  )
}
