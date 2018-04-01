import { User } from '../../db';
import { UserAttributes } from 'db/models/User';

export interface Dictionary<Value = any> {
  [key: string]: Value;
}
export interface GetUserQuery extends Dictionary {
  id: number;
}
export interface CreateUserMutation {
  user: UserAttributes;
}

// Query

export const user = async (_: any, { id }: GetUserQuery): Promise<UserAttributes | null>  => {
  const user = await User.findById(id);

  console.log(`QUERY -> user(id: ${id})`, user);
  return user ? user.toJSON() : null;
}

// Mutation

export const createUser = async (_: any, { user }: CreateUserMutation) => {
  const result = await User.create(user);

  console.log(`MUTATION -> createUser(user: ${user})`, result);
  return result ? result.toJSON() : null;
}
