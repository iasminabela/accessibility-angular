import { PaginationState } from "./pagination-state";

const items = Array.from({ length: 45 }, (_, index) => index + 1);

describe("PaginationState", () => {
  it("splits items into pages of the given size", () => {
    const pagination = new PaginationState(items, 15);
    expect(pagination.pageCount).toBe(3);
    expect(pagination.pageItems).toHaveLength(15);
    expect(pagination.pageItems[0]).toBe(1);
  });

  it("navigates between pages and clamps to bounds", () => {
    const pagination = new PaginationState(items, 15);

    pagination.nextPage();
    expect(pagination.page).toBe(2);
    expect(pagination.pageItems[0]).toBe(16);

    pagination.goToPage(99);
    expect(pagination.page).toBe(3);

    pagination.prevPage();
    expect(pagination.page).toBe(2);
  });
});
