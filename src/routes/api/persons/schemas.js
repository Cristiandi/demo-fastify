const personProperties = {
  name: { type: 'string' },
  lastName: { type: 'string', nullable: true },
  document: { type: 'string' },
  genre: {
    type: 'string',
    enum: ['M', 'F']
  },
  phone: { type: 'number', maximum: 9999999999 },
  created_at: { type: 'string' },
  updated_at: { type: 'string' }
};


const paramsJsonSchema = {
  type: 'object',
  properties: {
    personId: { type: 'number' }
  },
  required: [ 'personId' ]
};

const queryStringJsonSchema = {
  type: 'object',
  properties: {
    filter: { type: 'string' }
  },
  required: [ 'filter' ]
};

const bodyCreateJsonSchema = {
  type: 'object',
  properties: personProperties,
  required: ['name', 'document', 'genre', 'phone']
};


const bodyUpdateJsonSchema = {
  type: 'object',
  properties: personProperties
};

const getAllSchema = {
  querystring: queryStringJsonSchema,
  response: {
    200: {
      type: 'array',
      items: { 
        type: 'object',
        properties: personProperties
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
      properties: personProperties
    }
  }
};

const createSchema = {
  body: bodyCreateJsonSchema,
  response: {
    201: {
      type: 'object',
      properties: personProperties
    }
  }
};

const updateSchema = {
  params: paramsJsonSchema,
  body: bodyUpdateJsonSchema,
  response: {
    200: {
      type: 'object',
      properties: personProperties
    }
  }
};

const deleteSchema = {
  params: paramsJsonSchema,
  response: {
    200: {
      type: 'object',
      properties: personProperties
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
