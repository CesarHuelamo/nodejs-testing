const { User } = require("../../../domain/user/user");

class UsersParser {
  toDomain({ id, name, email, password }) {
    return new User({ id, name, email, password });
  }
}

module.exports = { UsersParser };
