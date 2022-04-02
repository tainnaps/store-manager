const express = require('express');
const ProductsControllers = require('../controllers/products');
const ProductsMiddlewares = require('../middlewares/products');

const router = express.Router();

router.get('/', ProductsControllers.getAll);

router.get('/:id', ProductsControllers.getById);

router.post(
  '/',
  ProductsMiddlewares.validateExistence,
  ProductsMiddlewares.validateValue,
  ProductsControllers.create,
);

module.exports = router;
