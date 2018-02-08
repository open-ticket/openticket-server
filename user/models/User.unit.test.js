const User = require("./User");
const { ValidationError } = require("objection");

describe("create new user", () => {
  test("creates a new user", () => {
    const user = User.fromJson({
      name: "Test Name",
      email: "test@example.com",
    });
    expect(user.name).toBe("Test Name");
  });

  test("doesn't require a name", () => {
    const user = User.fromJson({
      email: "test@example.com",
    });
    expect(user.email).toBe("test@example.com");
  });

  test("requires an email", () => {
    expect(() => {
      User.fromJson({
        name: "hello",
      });
    }).toThrow(ValidationError);
  });

  test("name must be a string", () => {
    expect(() => {
      User.fromJson({
        name: 10,
        email: "test@example.com",
      });
    }).toThrow(ValidationError);
  });

  test("email must be a string", () => {
    expect(() => {
      User.fromJson({
        name: "Test User",
        email: 10,
      });
    }).toThrow(ValidationError);
  });

  test("isDeleted must be set to false automatically", () => {
    const user = User.fromJson({
      name: "Test User",
      email: "test@example.com",
    });
    expect(user.isDeleted).toBeFalsy();
  });

  test("isDeleted can't be set manually", () => {
    const user = User.fromJson({
      name: "Test User",
      email: "test@example.com",
      isDeleted: true,
    });
    expect(user.isDeleted).toBeFalsy();
  });

  test("id can't be set manually", () => {
    const user = User.fromJson({
      name: "Test User",
      email: "test@example.com",
      id: "6c042b82-de71-493d-a138-63af24faf039",
    });
    expect(user.id).toBeUndefined();
  });
});