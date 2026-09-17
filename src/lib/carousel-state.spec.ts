import { CarouselState } from "./carousel-state";

const items = Array.from({ length: 10 }, (_, index) => index);

describe("CarouselState", () => {
  it("shows a window of items and advances by page", () => {
    const carousel = new CarouselState(items, 4);
    expect(carousel.visibleItems).toEqual([0, 1, 2, 3]);
    expect(carousel.canGoPrev).toBe(false);

    carousel.next();
    expect(carousel.visibleItems).toEqual([4, 5, 6, 7]);
    expect(carousel.canGoPrev).toBe(true);
  });

  it("clamps at the end of the list", () => {
    const carousel = new CarouselState(items, 4);
    carousel.next();
    carousel.next();
    carousel.next();
    expect(carousel.canGoNext).toBe(false);
    expect(carousel.visibleItems).toEqual([6, 7, 8, 9]);
  });
});
