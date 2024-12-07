const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { unauthorizedData } = require("../utils/errors");

//authorization middleware
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  //handle no authorization or incorrect authorization
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(unauthorizedData)
      .send({ message: "No Token Provided. Unauthorized User" });
  }

  //extract token from header
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    //verify token using secret key
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return res
      .status(unauthorizedData)
      .send({ message: "Authorization Required" });
  }

  req.user = payload; //assign payload to req obj

  return next(); //send request to next middleware
};

module.exports = auth;
