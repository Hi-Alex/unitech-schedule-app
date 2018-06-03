import * as createApplication from 'express';
import { router } from './routes';
import * as morgan from 'morgan';

const application = createApplication();

application.use(morgan('short'));
application.use(router);
application.use((req, res) => {
  res.send('Default response');
});

export const httpListener = application;
