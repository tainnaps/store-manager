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

  if (products.length === 0) return null;

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

const update = async (id, name, quantity) => {
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';

  await connection.execute(query, [name, quantity, id]);

  return {
    id,
    name,
    quantity,
  };
};

const deleteById = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';

  await connection.execute(query, [id]);
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
  deleteById,
};
