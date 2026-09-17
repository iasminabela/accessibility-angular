/** Client-side pagination over an in-memory list. */
export class PaginationState<T> {
  private currentPage = 1;

  constructor(
    public items: T[],
    public pageSize: number,
  ) {}

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.items.length / this.pageSize));
  }

  get page(): number {
    return Math.min(this.currentPage, this.pageCount);
  }

  get pageItems(): T[] {
    const start = (this.page - 1) * this.pageSize;
    return this.items.slice(start, start + this.pageSize);
  }

  goToPage(next: number): void {
    this.currentPage = Math.min(Math.max(1, next), this.pageCount);
  }

  nextPage(): void {
    this.goToPage(this.page + 1);
  }

  prevPage(): void {
    this.goToPage(this.page - 1);
  }
}
