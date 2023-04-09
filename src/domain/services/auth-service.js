class AuthService {
  #createHash;
  #jwt;
  #jwtSecret = "123456"; // this should be an RSA key

  constructor({ jwt, createHash }) {
    this.#createHash = createHash;
    this.#jwt = jwt;
  }

  hashPassword(password) {
    return this.#createHash("sha256") // this should be hashed with a salt
      .update(password)
      .digest()
      .toString("hex");
  }

  isValidPassword(hashedPassword, password) {
    return hashedPassword === this.hashPassword(password);
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

module.exports = { AuthService };
