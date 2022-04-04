const SalesModels = require('../models/sales');
const ProductsModels = require('../models/products');

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

const updateProducts = (products, action) => {
  const updatePromises = products.map(async ({ productId, quantity }) => {
    const product = await ProductsModels.getById(productId);
    let newQuantity;

    switch (action) {
      case 'update':
        newQuantity = product.quantity - quantity;
        break;
      case 'delete':
        newQuantity = product.quantity + quantity;
        break;
      default:
        break;
    }

    return ProductsModels.update(productId, product.name, newQuantity);
  });

  return Promise.all(updatePromises);
};

const create = async (products) => {
  await updateProducts(products, 'update');

  const createdSale = await SalesModels.create(products);

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
  const formattedSale = existingSale.map((saleDetail) => format(saleDetail));

  await updateProducts(formattedSale, 'delete');

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
