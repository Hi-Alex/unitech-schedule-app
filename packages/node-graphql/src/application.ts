import * as Application from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors';
import { connectGraphQL } from "./gql";

const application = new Application();
const router = new Router();

connectGraphQL(router);

if (!!+process.env.ENABLE_CORS!) {
  application.use(cors());
}

application
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

export const httpListener = application.callback();
