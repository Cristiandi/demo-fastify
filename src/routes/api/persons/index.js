// const oas = require('fastify-oas');
const { PersonService } = require('../../../services/persons');
const { createSchema, getAllSchema, getOneSchema, updateSchema, deleteSchema } = require('./schemas');

const personRoutes = async (app, options) => {
  // app.register(oas, require('../../../docs-config'));

  const personService = new PersonService(app);

  // create
  app.post('/', { schema: createSchema }, async (request, reply) => {
    const { body } = request;

    const created = await personService.create({ person: body });

    return created;
  });

  // get all
  app.get('/', { schema: getAllSchema }, async (request, reply) => {
    app.log.info('request.query', request.query);
    const persons = await personService.getAll({});
    return persons;
  });

  // get one
  app.get('/:personId', { schema: getOneSchema }, async (request, reply) => {
    const { params: { personId } } = request;

    app.log.info('personId', personId);

    const person = await personService.getOne({ id: personId });
    return person;
  });

  // update
  app.patch('/:personId', { schema: updateSchema }, async (request, reply) => {
    const { params: { personId } } = request;

    const { body } = request;

    app.log.info('personId', personId);
    app.log.info('body', body);

    const updated = await personService.update({ id: personId, person: body });

    return updated;
  });

  // delete
  app.delete('/:personId', { schema: deleteSchema }, async (request, reply) => {
    const { params: { personId } } = request;

    app.log.info('personId', personId);

    const deleted = await personService.delete({ id: personId });
    return deleted;
  });
};

module.exports = personRoutes;
