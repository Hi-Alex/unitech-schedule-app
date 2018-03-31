import * as Application from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';

console.log('ENV');
console.log(JSON.stringify(process.env, null, 2));

const app = new Application();
const router = new Router();
const typeDefs = readFileSync(resolve(__dirname, '..', 'graphql', 'schema.graphqls'), 'utf8');
const resolvers = {
  Query: {
    user: () => ({
      id: 1,
      firstName: 'uuuuu'
    }),
    users: () => [
      {
        id: 1
      },
      {
        id: 2
      }
    ]
  }
};
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
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
