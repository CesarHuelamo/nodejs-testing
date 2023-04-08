import * as awilix from "awilix";
import { MongoHandler } from "./infrastructure/persistence/mongo/mongo-handler.js";
import config from "./infrastructure/config/index.js";
import { AuthService } from "./domain/services/auth-service.js";
import { UsersParser } from "./infrastructure/persistence/mongo/users-parser.js";
import { UsersRepository } from "./infrastructure/persistence/mongo/users-repository.js";
import { LogIn } from "./application/login/index.js";
import jwt from "jsonwebtoken";
import { createHash } from "node:crypto";

export const container = awilix.createContainer();

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

export default container;
