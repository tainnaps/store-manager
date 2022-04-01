const express = require('express');
const SalesControllers = require('../controllers/sales');

const router = express.Router();

router.get('/', SalesControllers.getAll);

router.get('/:id', SalesControllers.getById);

module.exports = router;
