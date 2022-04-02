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

const getByName = async (name) => {
  const query = 'SELECT id, name, quantity FROM StoreManager.products WHERE name = ?';
  const [products] = await connection.execute(query, [name]);

  const [product] = products;

  return product;
};

const create = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)';
  const [{ insertId }] = await connection.execute(query, [name, quantity]);

  return {
    id: insertId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
};
