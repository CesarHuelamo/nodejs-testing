class UserNotFoundException extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = { UserNotFoundException };
