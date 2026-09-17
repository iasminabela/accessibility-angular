import { ensureSeedData } from "@/lib/seed";
import {
  deleteUsers,
  findUserByEmail,
  getUsers,
  updateUser,
} from "./userRepository";

describe("userRepository", () => {
  beforeEach(() => {
    ensureSeedData();
  });

  it("seeds an admin, a demo user and 45 members", () => {
    expect(getUsers()).toHaveLength(47);
  });

  it("finds a user by email, case-insensitively", () => {
    expect(findUserByEmail("ADMIN@eventer.app")?.isAdmin).toBe(true);
  });

  it("updates a user without changing its id", () => {
    const updated = updateUser("user-demo", { name: "Renamed" });
    expect(updated?.id).toBe("user-demo");
    expect(findUserByEmail("demo@eventer.app")?.name).toBe("Renamed");
  });

  it("deletes the given users", () => {
    deleteUsers(["user-1", "user-2"]);
    const remaining = getUsers().map((user) => user.id);
    expect(remaining).not.toContain("user-1");
    expect(remaining).not.toContain("user-2");
  });
});
