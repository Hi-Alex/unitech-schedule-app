import { IResolvers } from 'graphql-tools';
import { Query } from './Query';
import { Housing } from './Housing';
import { Faculty } from './Faculty';
import { Mutation } from './Mutation';
import { Classroom } from './Classroom';

export const resolvers = {
  Query,
  Housing,
  Faculty,
  Mutation,
  Classroom
} as any;
