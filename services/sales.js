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

  const formatedSale = saleDetails.map((saleDetail) => format(saleDetail));

  return { sale: formatedSale };
};

module.exports = {
  getAll,
  getById,
};
