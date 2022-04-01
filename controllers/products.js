const ProductsServices = require('../services/products');

const getAll = async (_req, res, next) => {
  try {
    const products = await ProductsServices.getAll();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { params } = req;
    const id = parseInt(params.id, 10);

    const { product, error } = await ProductsServices.getById(id);

    if (error) return next(error);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
};
