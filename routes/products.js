const express = require('express');
const ProductsControllers = require('../controllers/products');
const ProductsMiddlewares = require('../middlewares/products');

const router = express.Router();

router.get('/', ProductsControllers.getAll);

router.get('/:id', ProductsControllers.getById);

router.delete('/:id', ProductsControllers.deleteById);

router.post(
  '/',
  ProductsMiddlewares.validateExistence,
  ProductsMiddlewares.validateValue,
  ProductsControllers.create,
);

router.put(
  '/:id',
  ProductsMiddlewares.validateExistence,
  ProductsMiddlewares.validateValue,
  ProductsControllers.update,
);

module.exports = router;
