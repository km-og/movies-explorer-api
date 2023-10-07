/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
const jwt = require("jsonwebtoken");
const UnauthErr = require("../errors/UnauthErr");

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(JWT_SECRET);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthErr("Необходима авторизация"));
  } else {
    const tokenFromHeaders = authorization.replace("Bearer ", "");
    console.log(tokenFromHeaders);
    let payload;
    try {
      payload = jwt.verify(tokenFromHeaders, JWT_SECRET);
    } catch (err) {
      return next(new UnauthErr("Необходима авторизация"));
    }
    req.user = payload;
    console.log(payload);
    next();
  }
};
