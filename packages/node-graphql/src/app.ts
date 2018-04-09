import * as Application from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import { schema } from './gql';

const app = new Application();
const router = new Router();
const graphqlMiddleware = graphqlKoa({ schema });

router.post('/graphql', graphqlMiddleware);
router.get('/graphql', graphqlMiddleware);
if (process.env.NODE_ENV !== 'production') {
  router.get('/graphiql', graphiqlKoa({
    endpointURL: '/graphql'
  }));
}
app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

export { app };
