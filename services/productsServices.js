const faker = require('faker');
const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');

//const pool = require('../libs/postgresPool');
//const pool = require('../libs/sequelize');

class ProductsServices {
  constructor() {
    this.products = [];
    this.generate();
    //this.pool = pool;
    //this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        name: faker.commerce.productName(),
        id: faker.datatype.uuid(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  //usamos el asincronismo para cuando hay una demora en la respuesta, en este caso de find() lo tenemos en productsRoutes
  /*async find() {
    const query = 'SELECT * FROM tasks';
    const rta = await this.pool.query(query);
    return rta.rows;
  }*/

  async find() {
    const query = 'SELECT * FROM tasks';
    const [data] = await sequelize.query(query);
    return {
      data,
    };
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }

    if (product.isBlock) {
      throw boom.conflict('product is block');
    }

    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    // usamos el spread para no eliminar las cosas anteriores del objeto y solo editar lo qe llega en changes
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsServices;
