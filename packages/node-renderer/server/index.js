const Koa = require('koa');
const serve = require('koa-static');
const { join } = require('path');
const application = new Koa();

application.use(serve(join(__dirname, '..', '..', 'web', '.build')));

application.listen(80, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Listening...');
});
