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

module.exports = {
  getAll,
  getById,
};
