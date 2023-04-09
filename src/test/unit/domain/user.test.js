const { InvalidIdException } = require("../../../domain/user/exceptions/invalid-id-exception");
const { User } = require("../../../domain/user/user");

describe("user domain", () => {
  const id = 1;
  const name = "test";
  const email = "fake@test.com";
  const password = "fakepwd";

  test("should build user domain object correctly", () => {
    const user = new User({ id, name, email, password });

    expect(user.id).toBe(id);
    expect(user.name).toBe(name);
    expect(user.email).toBe(email);
    expect(user.password).toBe(password);
  });

  test("should throw an error if no id is passed to the build", () => {
    expect(() => {
      const user = new User({ name, email, password });
    }).toThrowError(InvalidIdException);
  });
});
