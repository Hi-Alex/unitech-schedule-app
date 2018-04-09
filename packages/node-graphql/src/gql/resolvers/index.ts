import { user, createUser } from './User';
import { IResolvers } from 'graphql-tools';

export const resolvers = {
  Query: {
    user
  },
  Mutation: {
    createUser
  }
} as IResolvers<any, any>;
