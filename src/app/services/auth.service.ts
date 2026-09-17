import { Injectable, computed, signal } from "@angular/core";
import type { Credentials, PublicUser, RegisterInput, User } from "@/types";
import { createId } from "@/lib/id";
import { validateRegister, hasErrors } from "@/lib/validation";
import { addUser, findUserByEmail } from "@/lib/repositories/userRepository";
import {
  clearSession,
  getSession,
  setSession,
} from "@/lib/repositories/sessionRepository";

export interface AuthResult {
  ok: boolean;
  error?: string;
}

function toPublicUser(user: User): PublicUser {
  const { password: _password, ...rest } = user;
  return rest;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly currentUserSignal = signal<PublicUser | null>(getSession());

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);
  readonly isAdmin = computed(() => this.currentUserSignal()?.isAdmin ?? false);

  login({ email, password }: Credentials): AuthResult {
    const user = findUserByEmail(email);
    if (!user || user.password !== password) {
      return { ok: false, error: "Email or password is incorrect." };
    }
    const publicUser = toPublicUser(user);
    setSession(publicUser);
    this.currentUserSignal.set(publicUser);
    return { ok: true };
  }

  register(input: RegisterInput): AuthResult {
    const validation = validateRegister(input);
    if (hasErrors(validation)) {
      return { ok: false, error: "Please fix the highlighted fields." };
    }
    if (findUserByEmail(input.email)) {
      return { ok: false, error: "An account with this email already exists." };
    }

    const user: User = {
      id: createId("user"),
      name: input.name.trim(),
      email: input.email.trim(),
      password: input.password,
      isAdmin: input.isAdmin,
      role: "Attendee",
      registeredAt: new Date().toISOString(),
    };
    addUser(user);

    const publicUser = toPublicUser(user);
    setSession(publicUser);
    this.currentUserSignal.set(publicUser);
    return { ok: true };
  }

  logout(): void {
    clearSession();
    this.currentUserSignal.set(null);
  }
}
