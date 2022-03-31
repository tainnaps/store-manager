const ProductsService = require('../services/products');

const getAll = async (_req, res, next) => {
  try {
    const products = await ProductsService.getAll();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
};
