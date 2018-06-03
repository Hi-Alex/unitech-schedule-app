import { Router } from 'express';
import * as proxy from 'http-proxy-middleware';

export const graphQLProxy = proxy({
  target: 'http://node-graphql/'
});
export const rendererProxy = proxy({
  target: 'http://node-renderer/',
  logLevel: 'info'
});
export const router = Router();

router.post('/graphql', graphQLProxy);
router.get('/graphiql', graphQLProxy);
router.get('/graphql', graphQLProxy);
router.use('/', rendererProxy);
