import { Component, EventEmitter, Input, Output } from "@angular/core";
import type { User } from "@/types";
import type { SortState } from "@/lib/sortable-data";
import { formatDate } from "@/lib/format";

export type UserSortKey = "name" | "registeredAt";

@Component({
  selector: "app-users-table",
  standalone: true,
  templateUrl: "./users-table.component.html",
})
export class UsersTableComponent {
  @Input() users: User[] = [];
  @Input() selectedIds: Set<string> = new Set();
  @Input() sort: SortState<UserSortKey> | null = null;
  @Output() toggleSelect = new EventEmitter<string>();
  @Output() toggleSort = new EventEmitter<UserSortKey>();
  @Output() edit = new EventEmitter<User>();

  readonly formatDate = formatDate;

  sortIndicator(key: UserSortKey): string {
    if (this.sort?.key !== key) {
      return "";
    }
    return this.sort.direction === "asc" ? " ▲" : " ▼";
  }

  ariaSort(key: UserSortKey): "ascending" | "descending" | null {
    if (this.sort?.key !== key) {
      return null;
    }
    return this.sort.direction === "asc" ? "ascending" : "descending";
  }
}
