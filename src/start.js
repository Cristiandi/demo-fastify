const { app } = require('./app');

const { APP_PORT } = require('./environment');

// run the server!
app.listen(APP_PORT, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  app.log.info(`server listening on ${address}`);

  process.on('SIGINT', () => app.close());
  process.on('SIGTERM', () => app.close());
});
