const productProperties = {
  _id: { type: 'string' },
  name: { type: 'string' },
  description: { type: 'string' },
  image: { type: 'string', nullable: true },
  price: { type: 'number', maximum: 9999999999 }
};

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
  body: bodyCreateJsonSchema,
  response: {
    201: {
      type: 'object',
      properties: productProperties
    }
  }
};

const updateSchema = {
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
