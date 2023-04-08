import { InvalidPasswordException } from "../../domain/user/exceptions/invalid-password-exception.js";
import { UserNotFoundException } from "../../domain/user/exceptions/user-not-found-exception.js";
import { loginResponseBuilder } from "./login-response.js";

export class LogIn {
  #usersRepository;
  #authService;

  constructor({ usersRepository, authService }) {
    this.#usersRepository = usersRepository;
    this.#authService = authService;
  }

  async execute({ email, password }) {
    const user = await this.#usersRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (!this.#authService.isValidPassword(user.password, password)) {
      throw new InvalidPasswordException();
    }

    const jwt = this.#authService.createJwt({ id: user.id });
    return loginResponseBuilder({ user, jwt });
  }
}
