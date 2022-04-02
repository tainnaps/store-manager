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
        type: 'notFound',
        message: 'Product not found',
      },
    };
  }

  return { product };
};

const create = async (name, quantity) => {
  const existingProduct = await ProductsModels.getByName(name);

  if (existingProduct) {
    return {
      error: {
        type: 'alreadyExists',
        message: 'Product already exists',
      },
    };
  }

  const createdProduct = await ProductsModels.create(name, quantity);

  return { product: createdProduct };
};

module.exports = {
  getAll,
  getById,
  create,
};
