const SalesModels = require('../models/sales');

const format = (saleData) => {
  const { date, quantity, sale_id: saleId, product_id: productId } = saleData;

  if (saleId && productId) {
    return {
      saleId,
      date,
      productId,
      quantity,
    };
  }

  if (productId && !saleId) {
    return {
      date,
      productId,
      quantity,
    };
  }
};

const getAll = async () => {
  const sales = await SalesModels.getAll();

  return sales.map((sale) => format(sale));
};

const getById = async (id) => {
  const saleDetails = await SalesModels.getById(id);

  if (!saleDetails) {
    return {
      error: {
        type: 'notFound',
        message: 'Sale not found',
      },
    };
  }

  const formattedSale = saleDetails.map((saleDetail) => format(saleDetail));

  return { sale: formattedSale };
};

const create = async (products) => {
  const createdSale = await SalesModels.create([...products]);

  return createdSale;
};

const update = async (id, products) => {
  const updatedSale = await SalesModels.update(id, products);

  return updatedSale;
};

const deleteById = async (id) => {
  const existingSale = await SalesModels.getById(id);

  if (!existingSale) {
    return {
      error: {
        type: 'notFound',
        message: 'Sale not found',
      },
    };
  }

  await SalesModels.deleteById(id);

  return {};
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
