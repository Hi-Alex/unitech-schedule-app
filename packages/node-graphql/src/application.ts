import * as Application from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import { connectGraphQL } from "./gql";

const application = new Application();
const router = new Router();

connectGraphQL(router);

application
  .use(bodyParser())
  .use(async ({ url, params, body, req }, next) => {
    console.log('->', url);
    console.log(params);
    console.log(body);
    console.log(req);
    await next();
    console.log('<-', url);
  })
  .use(router.routes())
  .use(router.allowedMethods());

export const httpListener = application.callback();
