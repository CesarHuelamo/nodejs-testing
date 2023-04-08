import { User } from "../../../domain/user/user.js";

export class UsersParser {
  toDomain({ id, name, password }) {
    return new User({ id, name, password });
  }
}
