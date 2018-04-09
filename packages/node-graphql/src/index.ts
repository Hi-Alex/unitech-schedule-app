Error.stackTraceLimit = 100;

import { app } from "./app";
import { sequelize } from './db/instance';

function startServer() {
  app.listen(3050, (error?: Error) => {
    if (error) {
      console.log('Server listening error');
      console.error(error);
      process.exit(1);
    }
    console.log('Server is running');
  });
}

sequelize.sync({
  force: true
})
  .then(startServer)
  .catch((error?: Error) => {
    console.log('DB sync failed');
    console.error(error);
  })
