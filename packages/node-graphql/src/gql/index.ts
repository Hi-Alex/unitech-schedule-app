import { schema } from './schema';
import { graphiqlKoa, graphqlKoa } from "apollo-server-koa";
import * as Router from "koa-router";

export function connectGraphQL(router: Router) {
  router.post('/graphql', graphqlKoa({ schema }));
  if (process.env.NODE_ENV !== 'production') {
    router.get('/graphiql', graphiqlKoa({
      endpointURL: '/graphql'
    }));
  }
}
