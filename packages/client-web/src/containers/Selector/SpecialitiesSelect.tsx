import * as React from "react";
import * as GET_SPECIALITIES from '../../pages/Specialities/GET_SPECIALITIES.graphql';
import { Query } from 'react-apollo';
import { Select } from "../../components/UI/Select/index";
import { ISpecialityAttributes } from "../../../../node-graphql/src/db/models/index";

export interface SpecialitiesSelectProps {
  onChange(specialityId: number): any;
  selected?: number;
}

const toOptions = (specialities: ISpecialityAttributes[]) => specialities.reduce((value, { id, name }) => {
  value[id] = name;
  return value;
}, {}) as any;

export function SpecialitiesSelect({ onChange, selected }: SpecialitiesSelectProps) {
  return (
    <Query
      query={GET_SPECIALITIES}
    >
      {({ loading, data }) => (
        <Select
          options={toOptions(data && data.specialities ? data.specialities : [])}
          selected={selected}
          onChange={onChange as any}
        />
      )}
    </Query>
  )
}
