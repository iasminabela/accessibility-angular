import { formatCurrency, formatDate, toDateTimeInputValue } from "./format";

describe("format", () => {
  it('renders 0 as "Free"', () => {
    expect(formatCurrency(0)).toBe("Free");
  });

  it("formats a positive amount as currency", () => {
    expect(formatCurrency(149)).toMatch(/149/);
  });

  it("formats an ISO date", () => {
    expect(formatDate("2026-09-14T09:00:00.000Z")).toMatch(/2026/);
  });

  it("returns an empty string for an invalid date", () => {
    expect(formatDate("not-a-date")).toBe("");
  });

  it("produces a datetime-local input value", () => {
    expect(toDateTimeInputValue("2026-09-14T09:05:00.000Z")).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
    );
  });
});
