const express = require('express');
const SalesControllers = require('../controllers/sales');
const SalesMiddlewares = require('../middlewares/sales');

const router = express.Router();

router.get('/', SalesControllers.getAll);

router.get('/:id', SalesControllers.getById);

router.post(
  '/',
  SalesMiddlewares.validateExistence,
  SalesMiddlewares.validateValue,
  SalesControllers.create,
);

router.put(
  '/:id',
  SalesMiddlewares.validateExistence,
  SalesMiddlewares.validateValue,
  SalesControllers.update,
);

module.exports = router;
