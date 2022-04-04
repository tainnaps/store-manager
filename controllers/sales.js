const SalesServices = require('../services/sales');

const getAll = async (_req, res, next) => {
  try {
    const sales = await SalesServices.getAll();

    res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { params } = req;
    const id = parseInt(params.id, 10);

    const { sale, error } = await SalesServices.getById(id);

    if (error) return next(error);

    res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const products = [...req.body];

    const createdSale = await SalesServices.create(products);

    res.status(201).json(createdSale);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const products = [...req.body];
    const { params } = req;
    const id = parseInt(params.id, 10);

    const updatedSale = await SalesServices.update(id, products);

    res.status(200).json(updatedSale);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { params } = req;
    const id = parseInt(params.id, 10);

    const { error } = await SalesServices.deleteById(id);

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
