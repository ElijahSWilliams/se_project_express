// Error Codes
class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "ServerError";
    this.status = 500;
  }
}

class BadRequestError extends Error {
  //invalidData 400
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.status = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.status = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "ForbiddenError";
    this.status = 403;
  }
}

class NotFoundError extends Error {
  //error 404
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.status = 404;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConflictError";
    this.status = 409;
  }
}

module.exports = {
  ConflictError,
  BadRequestError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
  ForbiddenError,
};

/*   invalidData: 400,
  dataNotFound: 404,
  defaultData: 500,
  duplicateData: 409,
  unauthorizedData: 401,
  forbidden: 403, */
