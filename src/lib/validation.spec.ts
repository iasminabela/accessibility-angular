import {
  hasErrors,
  isValidEmail,
  validateNewEvent,
  validateRegister,
} from "./validation";

describe("validation", () => {
  it("accepts a well-formed email", () => {
    expect(isValidEmail("a@b.com")).toBe(true);
    expect(isValidEmail("nope")).toBe(false);
  });

  it("flags mismatched passwords and missing fields on register", () => {
    const errors = validateRegister({
      name: "",
      email: "bad",
      password: "123",
      confirmPassword: "456",
      isAdmin: false,
    });
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.password).toBeDefined();
    expect(errors.confirmPassword).toBeDefined();
    expect(hasErrors(errors)).toBe(true);
  });

  it("passes a valid register payload", () => {
    const errors = validateRegister({
      name: "Dana",
      email: "dana@example.com",
      password: "secret1",
      confirmPassword: "secret1",
      isAdmin: false,
    });
    expect(hasErrors(errors)).toBe(false);
  });

  it("requires the event end to be after the start", () => {
    const errors = validateNewEvent({
      name: "Test",
      description: "",
      location: "",
      image: "data:image/png;base64,xxx",
      startDateTime: "2026-01-02T10:00",
      endDateTime: "2026-01-02T09:00",
      price: 10,
      maxPeople: 5,
    });
    expect(errors.endDateTime).toBeDefined();
  });
});
