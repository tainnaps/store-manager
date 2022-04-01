const SalesServices = require('../services/sales');

const getAll = async (_req, res) => {
  try {
    const sales = await SalesServices.getAll();

    res.status(200).json(sales);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getById = async (req, res) => {
  try {
    const { params } = req;
    const id = parseInt(params.id, 10);

    const { sale, error } = await SalesServices.getById(id);

    if (error) {
      const { message } = error;

      return res.status(404).json({ message });
    }

    res.status(200).json(sale);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAll,
  getById,
};
