import { IUserAttributes } from "../../../node-graphql/src/db/models/User";
import { createContext } from "react";

export interface RootContext {
  user?: IUserAttributes;
}

export const { Consumer, Provider } = createContext<RootContext>({});
