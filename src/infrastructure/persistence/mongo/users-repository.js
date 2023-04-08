export class UsersRepository {
  #mongoHandler;
  #parser;
  #collection = "users";

  constructor({ mongoHandler, usersParser }) {
    this.#mongoHandler = mongoHandler;
    this.#parser = usersParser;
  }

  async findByEmail(email) {
    try {
      const db = await this.#mongoHandler.getInstance();
      const document = await db.collection(this.#collection).findOne({ email });

      return document ? this.#parser.toDomain(document) : null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
