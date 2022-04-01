const statusByErrorType = {
  notFound: 404,
};

const handleError = (error, _req, res, _next) => {
  if (error.type) {
    const status = statusByErrorType[error.type];

    return res.status(status).json({ message: error.message });
  }

  console.log(error.message);

  return res.status(500).json({ message: 'Internal server error' });
};

module.exports = handleError;
