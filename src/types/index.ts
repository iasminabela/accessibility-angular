/**
 * Domain types shared across the application.
 *
 * The app is entirely static/front-end only: everything below is persisted in
 * `localStorage` and seeded on first load.
 */

export type PaymentOutcome = "success" | "error" | "notfound";

/** Dummy roles used only in the admin edit form. They have no behaviour. */
export const USER_ROLES = [
  "Attendee",
  "Organizer",
  "Moderator",
  "Support",
] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface User {
  id: string;
  name: string;
  email: string;
  /** Stored in plain text on purpose — dummy data for a workshop, never real. */
  password: string;
  isAdmin: boolean;
  role: UserRole;
  /** ISO date string. */
  registeredAt: string;
}

/** A user record without the credential field, safe to keep in the session. */
export type PublicUser = Omit<User, "password">;

export interface EventItem {
  id: string;
  name: string;
  description: string;
  location: string;
  /** Absolute or app-relative image URL, or a base64 data URL for added events. */
  image: string;
  /** Text alternative describing the image for screen reader users. */
  imageAlt?: string;
  /** ISO date-time strings. */
  startDateTime: string;
  endDateTime: string;
  price: number;
  maxPeople: number;
  /** Drives the Buy Ticket flow deterministically. */
  paymentOutcome: PaymentOutcome;
}

/** Payload used when an admin creates a new event. */
export type NewEventInput = Omit<EventItem, "id" | "paymentOutcome">;

export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAdmin: boolean;
}
