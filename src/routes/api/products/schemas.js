const productProperties = {
  _id: { type: 'string' },
  name: { type: 'string' },
  description: { type: 'string' },
  image: { type: 'string', nullable: true },
  price: { type: 'number', maximum: 9999999999 }
};

const tags = ['product'];

const paramsJsonSchema = {
  type: 'object',
  properties: {
    productId: { type: 'string' }
  },
  required: ['productId']
};

const queryStringJsonSchema = {
  type: 'object',
  properties: {
    filter: { type: 'string' }
  },
  required: ['filter']
};

const bodyCreateJsonSchema = {
  type: 'object',
  properties: productProperties,
  required: ['name', 'description', 'price']
};

const bodyUpdateJsonSchema = {
  type: 'object',
  properties: productProperties
};

const getAllSchema = {
  tags,
  querystring: queryStringJsonSchema,
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: productProperties
      }
    }
  }
};

const getOneSchema = {
  tags,
  params: paramsJsonSchema,
  querystring: queryStringJsonSchema,
  response: {
    200: {
      type: 'object',
      properties: productProperties
    }
  }
};

const createSchema = {
  tags,
  body: bodyCreateJsonSchema,
  response: {
    201: {
      type: 'object',
      properties: productProperties
    }
  }
};

const updateSchema = {
  tags,
  params: paramsJsonSchema,
  body: bodyUpdateJsonSchema,
  response: {
    200: {
      type: 'object',
      properties: productProperties
    }
  }
};

const deleteSchema = {
  tags,
  params: paramsJsonSchema,
  response: {
    200: {
      type: 'object',
      properties: productProperties
    }
  }
};

module.exports = {
  getAllSchema,
  getOneSchema,
  createSchema,
  updateSchema,
  deleteSchema
};
