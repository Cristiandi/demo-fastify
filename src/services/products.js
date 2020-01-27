const { ObjectId } = require('mongodb');

class ProductService {
  /**
   * Creates an instance of ProductService.
   * @param {object} app fastify app
   * @memberof ProductService
   */
  constructor (app) {
    if (!app.ready) throw new Error(`can't get .ready from fastify app.`);
    this.app = app;
    const { mongo } = this.app;

    if (!mongo) {
      throw new Error('cant get .mongo from fastify app.');
    }

    const db = mongo.db;
    const collection = db.collection('Product');
    this.collection = collection;
  }

  /**
   * function to create one
   *
   * @param {{ product: object }} { product }
   * @returns {Promise<{ id: number }>} created
   * @memberof ProductService
   */
  async create ({ product }) {
    const { insertedId } = (await this.collection.insertOne(product));

    const created = await this.getOne({ id: insertedId });

    return created;
  }

  /**
   * function to get all
   *
   * @param {{ filter: object }} { filter = {} }
   * @returns {Promise<{ id: number }> []} array
   * @memberof ProductService
   */
  async getAll ({ filter = {} }) {
    const products = await this.collection.find(filter).toArray();

    return products;
  }

  /**
   * function to get one
   *
   * @param {{ id: number }} { id }
   * @returns {Promise<{ id: number }>}
   * @memberof ProductService
   */
  async getOne ({ id }) {
    const err = new Error();

    if (!id) {
      err.statusCode = 400;
      err.message = 'id is needed.';
      throw err;
    }

    const product = await this.collection.findOne({ _id: ObjectId(id) });

    if (!product) {
      err.statusCode = 400;
      err.message = `can't get the product ${id}.`;
      throw err;
    }

    return product;
  }

  /**
   * function to update one
   *
   * @param {{ id: number, product: object }} { id, product }
   * @returns {Promise<{ id: number }>} updated
   * @memberof ProductService
   */
  async update ({ id, product }) {
    await this.getOne({ id });

    const { upsertedId } = (await this.collection.updateOne(
      {
        _id: ObjectId(id)
      },
      {
        $set: product
      },
      {
        upsert: true
      }
    ));

    const after = await this.getOne({ upsertedId });

    return after;
  }

  /**
   * function to delete one
   *
   * @param {{ id: number }} { id }
   * @returns {Promise<object>} deleted
   * @memberof ProductService
   */
  async delete ({ id }) {
    const before = await this.getOne({ id });

    await this.collection.deleteOne({ _id: ObjectId(id) });

    delete before._id;

    return before;
  }
}

module.exports = {
  ProductService
};
