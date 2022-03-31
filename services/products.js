const ProductsModel = require('../models/products');

const getAll = async () => {
  const products = await ProductsModel.getAll();

  return products;
};

module.exports = {
  getAll,
};
