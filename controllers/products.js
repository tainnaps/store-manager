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

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const { product, error } = await ProductsServices.create(name, quantity);

    if (error) return next(error);

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { params } = req;
    const id = parseInt(params.id, 10);

    const { product, error } = await ProductsServices.update(id, name, quantity);

    if (error) return next(error);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { params } = req;
    const id = parseInt(params.id, 10);

    const { error } = await ProductsServices.deleteById(id);

    if (error) return next(error);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
