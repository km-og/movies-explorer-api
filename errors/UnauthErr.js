/* eslint-disable linebreak-style */
class UnauthErr extends Error {
  constructor(mess) {
    super(mess);
    this.statusCode = 401;
  }
}

module.exports = UnauthErr;
