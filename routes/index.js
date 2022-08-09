const productsRouter = require('./productsRoutes');
const usersRouter = require('./usersRoutes');
const categoriesRouter = require('./categoriesRoutes');

function routerApi(app) {
  app.use('/products', productsRouter);
  app.use('/users', usersRouter);
  app.use('/categories', categoriesRouter);
}

module.exports = routerApi;
