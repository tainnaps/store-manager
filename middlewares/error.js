const handleError = (error, _req, res, _next) => {
  if (error.code) {
    return res.status(error.code).json({ message: error.message });
  }

  console.log(error.message);

  return res.status(500).json({ message: 'Internal server error' });
};

module.exports = handleError;
