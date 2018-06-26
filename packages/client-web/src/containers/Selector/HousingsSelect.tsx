import * as React from "react";
import * as GET_HOUSINGS from '../../pages/Housings/GET_HOUSINGS.graphql';
import { Query } from 'react-apollo';
import { Select } from "../../components/UI/Select/index";
import { IHousingAttributes } from "../../../../node-graphql/src/db/models/index";

export interface HousingSelectProps {
  onChange(housingId: number): any;
  selected?: number;
}

const toOptions = (housings: IHousingAttributes[]) => housings.reduce((value, { id, name }) => {
  value[id] = name;
  return value;
}, {}) as any;

export function HousingsSelect({ onChange, selected }: HousingSelectProps) {
  return (
    <Query
      query={GET_HOUSINGS}
    >
      {({ loading, data }) => (
        <Select
          options={toOptions(data && data.housings ? data.housings : [])}
          selected={selected}
          onChange={onChange as any}
        />
      )}
    </Query>
  )
}
