import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { ensureSeedData } from "@/lib/seed";
import { DEMO_CREDENTIALS } from "@/data/seedUsers";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(() => {
    ensureSeedData();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it("logs in a seeded user with valid credentials", () => {
    const outcome = service.login(DEMO_CREDENTIALS.user);

    expect(outcome.ok).toBe(true);
    expect(service.isAuthenticated()).toBe(true);
    expect(service.isAdmin()).toBe(false);
  });

  it("flags the admin account as admin", () => {
    service.login(DEMO_CREDENTIALS.admin);
    expect(service.isAdmin()).toBe(true);
  });

  it("rejects invalid credentials", () => {
    const outcome = service.login({
      email: "demo@eventer.app",
      password: "wrong",
    });
    expect(outcome.ok).toBe(false);
    expect(service.isAuthenticated()).toBe(false);
  });

  it("registers a new account and signs the user in", () => {
    service.register({
      name: "New Person",
      email: "new.person@example.com",
      password: "secret1",
      confirmPassword: "secret1",
      isAdmin: false,
    });
    expect(service.currentUser()?.email).toBe("new.person@example.com");
  });

  it("logs out", () => {
    service.login(DEMO_CREDENTIALS.user);
    service.logout();
    expect(service.isAuthenticated()).toBe(false);
  });
});
