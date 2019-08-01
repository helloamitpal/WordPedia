const errorHandler = (statusCode = 500, err, res) => {
  // custom application error
  if (typeof (err) === 'string') {
    return res.status(statusCode).json({ message: err });
  }

  // mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  // jwt authentication error
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid Token' });
  }

  // default to 500 server error
  return res.status(statusCode).json({ message: (err && err.message) || err });
};

module.exports = errorHandler;
