const ProductsModels = require('../models/products');

const getAll = async () => {
  const products = await ProductsModels.getAll();

  return products;
};

const getById = async (id) => {
  const product = await ProductsModels.getById(id);

  if (!product) {
    return {
      error: {
        message: 'Product not found',
      },
    };
  }

  return { product };
};

module.exports = {
  getAll,
  getById,
};
