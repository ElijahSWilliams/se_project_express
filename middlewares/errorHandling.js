// default errorHandler for errors
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Set default status code if no status code is present
  const errorMessage = err.message || "An Unexpected Error Occured"; // set default error message

  console.error(errorMessage, statusCode);

  res.status(statusCode).send({ message: errorMessage });
};

module.exports = errorHandler;
