const Koa = require('koa');
const serve = require('koa-static');
const { get } = require('koa-route');
const { join } = require('path');
const application = new Koa();
const serving = serve(join(__dirname, '..', '..', 'web', '.build'));

application.use(get('/login', serving));
application.use(get('/lists', serving));
application.use(get('/schedule', serving));
application.use(serving);

application.listen(80, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Listening...');
});
