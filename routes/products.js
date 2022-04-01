const express = require('express');
const ProductsControllers = require('../controllers/products');

const router = express.Router();

router.get('/', ProductsControllers.getAll);

router.get('/:id', ProductsControllers.getById);

module.exports = router;
