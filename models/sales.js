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

module.exports = {
  getAll,
  getById,
};
