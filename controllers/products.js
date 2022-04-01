const ProductsServices = require('../services/products');

const getAll = async (_req, res) => {
  try {
    const products = await ProductsServices.getAll();

    res.status(200).json(products);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getById = async (req, res) => {
  try {
    const { params } = req;
    const id = parseInt(params.id, 10);

    const { product, error } = await ProductsServices.getById(id);

    if (error) {
      const { message } = error;

      return res.status(404).json({ message });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAll,
  getById,
};
