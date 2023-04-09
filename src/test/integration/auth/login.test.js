const { MongoClient } = require("mongodb");
const awilix = require("awilix");
const { MongoMemoryServer } = require("mongodb-memory-server");
const container = require("../../../container");
const { app, server } = require("../../../index");
const { UserNotFoundException } = require("../../../domain/user/exceptions/user-not-found-exception");
const { InvalidPasswordException } = require("../../../domain/user/exceptions/invalid-password-exception");
const request = require("supertest")(app);

describe("auth controller", () => {
  let client;
  let mongod;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create({
      instance: {
        port: 27017,
        dbName: "testing",
      },
      auth: {
        customRootName: "admin",
        customRootPwd: "admin",
      },
    });

    const uri = mongod.getUri();

    client = new MongoClient("mongodb://admin:admin@127.0.0.1");
    await client.connect();
  });

  afterAll(async () => {
    await client.close();
    await mongod.stop();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    server.close();
    await client.db("testing").collection("users").deleteMany();
  });

  describe("POST /log-in", () => {
    const url = "/api/v1/auth/log-in";
    const name = "test";
    const email = "fake@test.com";
    const password = "123456";
    const hashedPassword = "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92";

    test("should return 200 after successful login", async () => {
      await client.db("testing").collection("users").insertOne({ id: 1, name, email, password: hashedPassword });
      const response = await request.post(url).send({ email, password });

      expect(response.status).toBe(200);
      expect(typeof response.body.jwt).toBe("string");
      expect(response.body.user.name).toBe(name);
      expect(response.body.user.id).toBe(1);
      expect(response.body.user.email).toBe(email);
    });

    test("should return 401 after not finding a user", async () => {
      const response = await request.post(url).send({ email, password });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({});
    });

    test("should return 401 after receiving the wrong password", async () => {
      await client.db("testing").collection("users").insertOne({ id: 1, name, email, password: "wrongpassword" });
      const response = await request.post(url).send({ email, password });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({});
    });
  });
});
