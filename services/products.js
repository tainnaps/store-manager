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

const update = async (id, name, quantity) => {
  const existingProduct = await ProductsModels.getById(id);

  if (!existingProduct) {
    return {
      error: {
        type: 'notFound',
        message: 'Product not found',
      },
    };
  }

  const updatedProduct = await ProductsModels.update(id, name, quantity);

  return { product: updatedProduct };
};
const deleteById = async (id) => {
  const existingProduct = await ProductsModels.getById(id);

  if (!existingProduct) {
    return {
      error: {
        type: 'notFound',
        message: 'Product not found',
      },
    };
  }

  await ProductsModels.deleteById(id);

  return {};
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
