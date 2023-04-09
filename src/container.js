const awilix = require("awilix");
const { MongoHandler } = require("./infrastructure/persistence/mongo/mongo-handler");
const config = require("./infrastructure/config/index");
const { AuthService } = require("./domain/services/auth-service");
const { UsersParser } = require("./infrastructure/persistence/mongo/users-parser");
const { UsersRepository } = require("./infrastructure/persistence/mongo/users-repository");
const { LogIn } = require("./application/login/index");
const jwt = require("jsonwebtoken");
const { createHash } = require("node:crypto");

const container = awilix.createContainer();

container.register({
  mongoHandler: awilix.asClass(MongoHandler).singleton(),
  config: awilix.asValue(config),
  authService: awilix.asClass(AuthService).singleton(),
  usersParser: awilix.asClass(UsersParser).singleton(),
  usersRepository: awilix.asClass(UsersRepository).singleton(),
  logIn: awilix.asClass(LogIn).singleton(),
  jwt: awilix.asValue(jwt),
  createHash: awilix.asValue(createHash),
});

module.exports = container;
