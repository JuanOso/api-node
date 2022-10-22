const productsRouter = require('./productsRoutes');
const usersRouter = require('./usersRoutes');
const categoriesRouter = require('./categoriesRoutes');
const customersRouter = require('./customersRoutes');
const ordersRouter = require('./orderRoutes');

function routerApi(app) {
  app.use('/products', productsRouter);
  app.use('/users', usersRouter);
  app.use('/categories', categoriesRouter);
  app.use('/customers', customersRouter);
  app.use('/orders', ordersRouter);
}

module.exports = routerApi;
