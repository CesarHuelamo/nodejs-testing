export class AuthService {
  #createHash;
  #jwt;
  #jwtSecret = "123456"; // this should be an RSA key

  constructor({ jwt, createHash }) {
    this.#createHash = createHash;
    this.#jwt = jwt;
  }

  hashPassword(password) {
    const hash = this.#createHash("sha256"); // this should be hashed with a salt
    hash.update(password);
    return hash.digest.toString("hex");
  }

  isValidPassword(hashedPassword, password) {
    const hash = this.#createHash("sha256");
    hash.update(password);
    return hashedPassword === hash.digest().toString("hex");
  }

  createJwt(payload) {
    return this.#jwt.sign(
      {
        data: payload,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      },
      this.#jwtSecret,
    );
  }
}
