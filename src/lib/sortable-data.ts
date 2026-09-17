export type SortDirection = "asc" | "desc";

export interface SortState<K extends string> {
  key: K;
  direction: SortDirection;
}

/**
 * Sorts a list by a configured set of accessor functions.
 *
 * Clicking the same key flips direction; a new key starts ascending.
 */
export class SortableData<T, K extends string> {
  sort: SortState<K> | null;

  constructor(
    public items: T[],
    private accessors: Record<K, (item: T) => string | number>,
    initial: SortState<K> | null = null,
  ) {
    this.sort = initial;
  }

  get sorted(): T[] {
    if (!this.sort) {
      return this.items;
    }
    const accessor = this.accessors[this.sort.key];
    const factor = this.sort.direction === "asc" ? 1 : -1;
    return [...this.items].sort((a, b) => {
      const aValue = accessor(a);
      const bValue = accessor(b);
      if (aValue < bValue) return -1 * factor;
      if (aValue > bValue) return 1 * factor;
      return 0;
    });
  }

  toggleSort(key: K): void {
    if (this.sort?.key === key) {
      this.sort = {
        key,
        direction: this.sort.direction === "asc" ? "desc" : "asc",
      };
      return;
    }
    this.sort = { key, direction: "asc" };
  }
}
