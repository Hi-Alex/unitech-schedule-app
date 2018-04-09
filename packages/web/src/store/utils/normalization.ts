export interface ResponseLike<Data = any> {
  data: Data;
}
export interface AttributesModel<Data = any> {
  id: number;
  attributes: Data;
}
export interface Dictionary<Data = any> {
  [key: string]: Data;
}
export interface Normalized<Data = any> {
  ids: number[];
  data: Dictionary<Data>;
}

export const emptyNormalized: Normalized = {
  ids: [],
  data: {}
};
export const normalizeAttributesModelReducer = <Data = any>(
  normalized: Normalized<Data>,
  { id, attributes }: AttributesModel<Data>
): Normalized<Data> => {
  normalized.ids.push(id);
  normalized.data[id] = attributes;
  return normalized;
};
export const normalizeAttributesModelResponse = <Data = any>({
  data
}: ResponseLike<AttributesModel<Data>[]>): Normalized<Data> =>
  data.reduce(normalizeAttributesModelReducer, {
    ids: [],
    data: {}
  });
