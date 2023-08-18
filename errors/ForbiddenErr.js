/* eslint-disable linebreak-style */
class ForbiddenErr extends Error {
  constructor(mess) {
    super(mess);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenErr;
