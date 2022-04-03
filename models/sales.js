const connection = require('./connection');

const getAll = async () => {
  const query = `
    SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    ORDER BY sp.sale_id, sp.product_id
  `;

  const [sales] = await connection.execute(query);

  return sales;
};

const getById = async (id) => {
  const query = `
    SELECT s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ?
    ORDER BY sp.product_id
  `;

  const [sale] = await connection.execute(query, [id]);

  if (sale.length === 0) return null;

  return sale;
};

const create = async (products) => {
  const insertSaleQuery = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';

  const [{ insertId: saleId }] = await connection.execute(insertSaleQuery);

  const insertProductsQuery = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)
  `;

  const insertPromises = products
    .map(({ productId, quantity }) => connection.execute(
      insertProductsQuery,
      [saleId, productId, quantity],
    ));

  await Promise.all(insertPromises);

  return {
    id: saleId,
    itemsSold: [...products],
  };
};

const update = async (id, products) => {
  const query = `
    UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE sale_id = ? AND product_id = ?
  `;

  const updatePromises = products
    .map(({ productId, quantity }) => connection.execute(
      query,
      [quantity, id, productId],
    ));

  await Promise.all(updatePromises);

  return {
    saleId: id,
    itemUpdated: [...products],
  };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
