class InvalidIdException extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = { InvalidIdException };
