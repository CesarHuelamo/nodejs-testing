class InvalidPasswordException extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = { InvalidPasswordException };
