const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT id, name, quantity FROM StoreManager.products ORDER BY id';
  const [products] = await connection.execute(query);

  return products;
};

const getById = async (id) => {
  const query = 'SELECT id, name, quantity FROM StoreManager.products WHERE id = ?';
  const [products] = await connection.execute(query, [id]);

  if (products.length === 0) return null;

  const [product] = products;

  return product;
};

module.exports = {
  getAll,
  getById,
};
