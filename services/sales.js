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

const getNewQuantity = (action, currentQuantity, updateQuantity) => {
  let newQuantity;

  switch (action) {
    case 'update':
      newQuantity = currentQuantity - updateQuantity;
      break;
    case 'delete':
      newQuantity = currentQuantity + updateQuantity;
      break;
    default:
      break;
  }

  return newQuantity;
};

/*
  Usei o link abaixo como referência para solucionar o problema que tive ao usar uma função assíncrona como callback do map.
  link: https://stackoverflow.com/questions/33438158/best-way-to-call-an-asynchronous-function-within-map
*/
const getNewProducts = async (products, action) => {
  const newProducts = products
    .map(async ({ productId, quantity }) => {
      const product = await ProductsModels.getById(productId);
      const newQuantity = getNewQuantity(action, product.quantity, quantity);

      return {
        id: productId,
        name: product.name,
        quantity: newQuantity,
      };
    });

  return Promise.all(newProducts);
};

const updateProducts = async (products, action) => {
  const newProducts = await getNewProducts(products, action);

  const invalidQuantities = newProducts
    .some(({ quantity }) => quantity < 0);

  if (invalidQuantities) {
    return {
      error: {
        type: 'invalidValue',
        message: 'Such amount is not permitted to sell',
      },
    };
  }

  const updatePromises = newProducts
    .map(({ id, name, quantity }) => ProductsModels.update(id, name, quantity));

  return { updatePromise: Promise.all(updatePromises) };
};

const create = async (products) => {
  const { updatePromise, error } = await updateProducts(products, 'update');

  if (error) return { error };

  await updatePromise;

  const createdSale = await SalesModels.create(products);

  return { sale: createdSale };
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

  const { updatePromise, error } = updateProducts(formattedSale, 'delete');

  if (error) return { error };

  await updatePromise;

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
