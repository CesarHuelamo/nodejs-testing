const awilix = require("awilix");
const container = require("../../../../container");
const { app, server } = require("../../../../index");
const { UserNotFoundException } = require("../../../../domain/user/exceptions/user-not-found-exception");
const { InvalidPasswordException } = require("../../../../domain/user/exceptions/invalid-password-exception");
const request = require("supertest")(app);

describe("auth controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
    server.close();
  });

  describe("POST /log-in", () => {
    const logInMock = {
      execute: jest.fn(),
    };

    container.register({
      logIn: awilix.asValue(logInMock),
    });

    const url = "/api/v1/auth/log-in";
    const email = "fake@test.com";
    const password = "123456";

    test("should return 200 after successful login", async () => {
      logInMock.execute.mockReturnValue("ok");

      const response = await request.post(url).send({ email, password });

      expect(response.status).toBe(200);
      expect(response.body).toBe("ok");
      expect(logInMock.execute).toHaveBeenCalledTimes(1);
      expect(logInMock.execute).toHaveBeenCalledWith({ email, password });
    });

    test("should return 401 with UserNotFoundException", async () => {
      logInMock.execute.mockRejectedValue(new UserNotFoundException());

      const response = await request.post(url).send({ email, password });

      expect(response.status).toBe(401);
      expect(logInMock.execute).toHaveBeenCalledTimes(1);
      expect(logInMock.execute).toHaveBeenCalledWith({ email, password });
    });

    test("should return 401 with InvalidPasswordException", async () => {
      logInMock.execute.mockRejectedValue(new InvalidPasswordException());

      const response = await request.post(url).send({ email, password });

      expect(response.status).toBe(401);
      expect(logInMock.execute).toHaveBeenCalledTimes(1);
      expect(logInMock.execute).toHaveBeenCalledWith({ email, password });
    });

    test("should return 500 with an uncontrolled exception", async () => {
      logInMock.execute.mockRejectedValue(new Error());

      const response = await request.post(url).send({ email, password });

      expect(response.status).toBe(500);
      expect(logInMock.execute).toHaveBeenCalledTimes(1);
      expect(logInMock.execute).toHaveBeenCalledWith({ email, password });
    });
  });
});
