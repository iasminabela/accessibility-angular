/** Windowed carousel state: shows `perView` items and pages by `perView`. */
export class CarouselState<T> {
  startIndex = 0;

  constructor(
    public items: T[],
    public perView: number,
  ) {}

  get maxStart(): number {
    return Math.max(0, this.items.length - this.perView);
  }

  get visibleItems(): T[] {
    return this.items.slice(this.startIndex, this.startIndex + this.perView);
  }

  get canGoPrev(): boolean {
    return this.startIndex > 0;
  }

  get canGoNext(): boolean {
    return this.startIndex < this.maxStart;
  }

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.items.length / this.perView));
  }

  get activePage(): number {
    return Math.floor(this.startIndex / this.perView) + 1;
  }

  next(): void {
    this.startIndex = Math.min(this.startIndex + this.perView, this.maxStart);
  }

  prev(): void {
    this.startIndex = Math.max(this.startIndex - this.perView, 0);
  }
}
