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

  const [{ insertId }] = await connection.execute(insertSaleQuery);

  const insertProductsQuery = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)
  `;

  const insertPromises = products
    .map(({ productId, quantity }) => connection.execute(
      insertProductsQuery,
      [insertId, productId, quantity],
    ));

  await Promise.all(insertPromises);

  return {
    id: insertId,
    itemsSold: [...products],
  };
};

module.exports = {
  getAll,
  getById,
  create,
};
