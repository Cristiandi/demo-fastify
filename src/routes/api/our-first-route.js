const schemaExample = require('./schema-example');

async function routes (app, options) {
  const noSQLDB = app.mongo.db();
  const collection = noSQLDB.collection('Product');

  app.get('/', async (request, reply) => {
    return { hello: 'world' };
  });

  app.get('/search/:id', async (request, reply) => {
    console.log('request.params.id ', request.params.id);

    const result = await collection.findOne({ id: Number(request.params.id) });

    await collection.insertOne({ name: 'test', description: 'test', price: 32 });

    if (!result) {
      throw new Error(`incorrect value`);
    }

    return result;
  });

  app.post('/schema',  { schema: schemaExample }, async (request, reply) => {
    const { body } = request;
    console.log('body', body);
    if (!body.ippolito) {
      const err = new Error();
      err.statusCode = 412;
      err.message = 'sorry you need to ippolito to resolve this.';

      throw err;
    }

    return body;
  });
};

module.exports = routes;