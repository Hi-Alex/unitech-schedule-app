import { createServer } from 'http';
import { httpListener } from './application';
import { syncDB } from "./db";

const server = createServer(httpListener);

(async () => {
  try {
    await syncDB();
    server
      .listen(3000)
      .on('listening', () => {
        console.log('Server successful started!');
      })
      .on('error', (error: Error) => {
        console.log('Server start error');
        console.error(error);
        process.exit(1);
      });
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
})();
