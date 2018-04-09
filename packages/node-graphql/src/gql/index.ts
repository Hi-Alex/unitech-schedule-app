import { resolvers } from './resolvers';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { makeExecutableSchema } from 'graphql-tools';

console.log('resolvers', resolvers);

const SCHEMAS_PATH = resolve(__dirname, '..', '..', 'graphql');
const typeDefs = readFileSync(resolve(SCHEMAS_PATH, 'schema.graphqls'), 'utf8');

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
