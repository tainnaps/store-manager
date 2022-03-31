const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT id, name, quantity FROM StoreManager.products ORDER BY id';
  const [products] = await connection.execute(query);

  return products;
};

module.exports = {
  getAll,
};
