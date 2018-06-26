import { resolve } from "path";
import { readFileSync } from "fs";

const SCHEMAS_PATH = resolve(__dirname, '..', '..', '..', 'graphql');
const ORDER = [
  'schema',
  'enums',
  'Housing',
  'Classroom',
  'Faculty',
  'Cathedra',
  'Speciality',
  'Worker',
  'Group',
  'User'
];
console.log(ORDER);
export const typeDefs = ORDER.map(file => readFileSync(resolve(SCHEMAS_PATH, file + '.graphqls'), 'utf-8'));
console.log(typeDefs);