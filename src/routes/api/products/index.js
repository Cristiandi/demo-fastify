const { ProductService } = require('../../../services/products');
const {
  createSchema,
  getAllSchema,
  getOneSchema,
  updateSchema,
  deleteSchema
 } = require('./schemas');

const productRoutes = async (app, options) => {
  const productService = new ProductService(app);

  // create
  app.post('/', { schema: createSchema }, async (request, reply) => {
    const { body } = request;

    const insertedId = await productService.create({ product: body });
    app.log.info('insertedId', insertedId);
    return { _id: insertedId };
  });

  // get all
  app.get('/', { schema: getAllSchema }, async (request, reply) => {
    app.log.info('request.query', request.query);
    const products = await productService.getAll({ filter: {} });
    return products;
  });

  // get one
  app.get('/:productId', { schema: getOneSchema }, async (request, reply) => {
    const { params: { productId } } = request;

    app.log.info('productId', productId);

    const product = await productService.getOne({ id: productId });
    
    return product;
  });

  // update
  app.patch('/:productId', { schema: updateSchema }, async (request, reply) => {
    const { params: { productId } } = request;

    const { body } = request;

    app.log.info('productId', productId);
    app.log.info('body', body);

    const updated = await productService.update({ id: productId, product: body });

    return updated;
  });

  // delete
  app.delete('/:productId', { schema: deleteSchema }, async (request, reply) => {
    const { params: { productId } } = request;

    app.log.info('productId', productId);

    const deleted = await productService.delete({ id: productId });


    return deleted;
  });
};

module.exports = productRoutes;