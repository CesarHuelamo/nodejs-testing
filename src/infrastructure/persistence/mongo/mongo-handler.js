import { MongoClient } from "mongodb";

export class MongoHandler {
  #url;
  #dbName;
  #db;

  constructor({ config }) {
    this.#url = config.mongo.url;
    this.#dbName = config.mongo.dbName;
  }

  async getInstance() {
    if (this.#db) {
      return this.#db;
    }

    const client = new MongoClient(this.#url);
    await client.connect();

    this.#db = client.db(this.#dbName);
    return this.#db;
  }
}
