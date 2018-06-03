import { createServer } from 'http';
import { httpListener } from './application';

const server = createServer(httpListener);

console.log('Setup server...');
server
  .listen(80)
  .on('listening', console.log.bind(console, 'Successful!'))
  .on('error', error => {
    console.log('Server error');
    console.error(error);
  });
