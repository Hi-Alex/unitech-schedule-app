import { IResolvers } from 'graphql-tools';
import { Query } from './Query';
import { Group } from './Group';
import { Housing } from './Housing';
import { Faculty } from './Faculty';
import { Mutation } from './Mutation';
import { Classroom } from './Classroom';
import { Speciality } from './Speciality';
import { Cathedra } from './Cathedra';
import { Worker } from './Worker';

export const resolvers = {
  Query,
  Group,
  Housing,
  Faculty,
  Mutation,
  Classroom,
  Speciality,
  Cathedra,
  Worker
} as any;

