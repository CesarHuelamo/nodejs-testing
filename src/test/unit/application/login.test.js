const { LogIn } = require("../../../application/login");
const { User } = require("../../../domain/user/user");
const { UserNotFoundException } = require("../../../domain/user/exceptions/user-not-found-exception");
const { InvalidPasswordException } = require("../../../domain/user/exceptions/invalid-password-exception");

describe("log in use case", () => {
  const usersRepositoryMock = {
    findByEmail: jest.fn(),
  };

  const authServiceMock = {
    isValidPassword: jest.fn(),
    createJwt: jest.fn(),
  };

  let logIn;

  beforeAll(() => {
    logIn = new LogIn({
      usersRepository: usersRepositoryMock,
      authService: authServiceMock,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const email = "fake@test.com";
  const password = "fakepwd";

  const user = new User({
    email,
    id: 1,
    name: "test",
    password: "123456",
  });

  test("should execute login correctly", async () => {
    usersRepositoryMock.findByEmail.mockReturnValue(user);
    authServiceMock.isValidPassword.mockReturnValue(true);
    authServiceMock.createJwt.mockReturnValue("fakeJwt");

    const expectedResponse = {
      user: {
        email,
        id: 1,
        name: "test",
      },
      jwt: "fakeJwt",
    };

    const response = await logIn.execute({ email, password });

    expect(response).toEqual(expectedResponse);
    expect(usersRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
    expect(usersRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
    expect(authServiceMock.isValidPassword).toHaveBeenCalledTimes(1);
    expect(authServiceMock.isValidPassword).toHaveBeenCalledWith("123456", password);
    expect(authServiceMock.createJwt).toHaveBeenCalledTimes(1);
    expect(authServiceMock.createJwt).toHaveBeenCalledWith({ id: 1 });
  });

  test("should throw UserNotFoundException if there is no user on the platform", async () => {
    usersRepositoryMock.findByEmail.mockReturnValue(null);

    await expect(logIn.execute({ email, password })).rejects.toBeInstanceOf(UserNotFoundException);

    expect(usersRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
    expect(usersRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
    expect(authServiceMock.isValidPassword).toHaveBeenCalledTimes(0);
    expect(authServiceMock.createJwt).toHaveBeenCalledTimes(0);
  });

  test("should throw InvalidPasswordException if the password does not match", async () => {
    usersRepositoryMock.findByEmail.mockReturnValue(user);
    authServiceMock.isValidPassword.mockReturnValue(false);

    await expect(logIn.execute({ email, password })).rejects.toBeInstanceOf(InvalidPasswordException);

    expect(usersRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
    expect(usersRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
    expect(authServiceMock.isValidPassword).toHaveBeenCalledTimes(1);
    expect(authServiceMock.isValidPassword).toHaveBeenCalledWith("123456", password);
    expect(authServiceMock.createJwt).toHaveBeenCalledTimes(0);
  });
});
