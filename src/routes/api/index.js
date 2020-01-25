const apiRoutes = async (app, options) => {
  app.register(require('./persons'), { prefix: 'persons' });
  app.register(require('./products'), { prefix: 'products' });
  app.register(require('./our-first-route'), { prefix: 'others' });
};

module.exports = apiRoutes;