import {
  STORAGE_KEYS,
  hasValue,
  readValue,
  removeValue,
  writeValue,
} from "./storage";

describe("storage", () => {
  it("returns the fallback when nothing is stored", () => {
    expect(readValue(STORAGE_KEYS.users, [])).toEqual([]);
  });

  it("round-trips a written value", () => {
    writeValue(STORAGE_KEYS.session, { id: "user-1" });
    expect(readValue(STORAGE_KEYS.session, null)).toEqual({ id: "user-1" });
  });

  it("returns the fallback when the stored value is corrupt JSON", () => {
    window.localStorage.setItem(STORAGE_KEYS.events, "{not-json");
    expect(readValue(STORAGE_KEYS.events, [])).toEqual([]);
  });

  it("reports presence and removes values", () => {
    writeValue(STORAGE_KEYS.registrations, ["evt-1"]);
    expect(hasValue(STORAGE_KEYS.registrations)).toBe(true);
    removeValue(STORAGE_KEYS.registrations);
    expect(hasValue(STORAGE_KEYS.registrations)).toBe(false);
  });
});
