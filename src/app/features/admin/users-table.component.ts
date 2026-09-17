import { Component, EventEmitter, Input, Output } from "@angular/core";
import type { User } from "@/types";
import type { SortState } from "@/lib/sortable-data";
import { formatDate } from "@/lib/format";

export type UserSortKey = "name" | "registeredAt";

@Component({
  selector: "app-users-table",
  standalone: true,
  template: `
    <table class="w-full border-collapse text-sm">
      <thead>
        <tr class="border-b border-slate-200 text-left text-slate-500">
          <th class="w-10 px-3 py-2"></th>
          <th class="px-3 py-2">
            <span
              (click)="toggleSort.emit('name')"
              class="cursor-pointer font-medium hover:text-slate-700"
            >
              Name{{ sortIndicator("name") }}
            </span>
          </th>
          <th class="px-3 py-2 font-medium">Email</th>
          <th class="px-3 py-2 font-medium">Role</th>
          <th class="px-3 py-2">
            <span
              (click)="toggleSort.emit('registeredAt')"
              class="cursor-pointer font-medium hover:text-slate-700"
            >
              Registered{{ sortIndicator("registeredAt") }}
            </span>
          </th>
          <th class="w-12 px-3 py-2"></th>
        </tr>
      </thead>
      <tbody>
        @for (user of users; track user.id) {
          <tr class="border-b border-slate-100 hover:bg-slate-50">
            <td class="px-3 py-2">
              <input
                type="checkbox"
                [checked]="selectedIds.has(user.id)"
                (change)="toggleSelect.emit(user.id)"
              />
            </td>
            <td class="px-3 py-2 font-medium text-slate-800">
              {{ user.name }}
            </td>
            <td class="px-3 py-2 text-slate-500">{{ user.email }}</td>
            <td class="px-3 py-2 text-slate-500">{{ user.role }}</td>
            <td class="px-3 py-2 text-slate-500">
              {{ formatDate(user.registeredAt) }}
            </td>
            <td class="px-3 py-2">
              <span
                (click)="edit.emit(user)"
                class="cursor-pointer text-slate-400 hover:text-brand-600"
              >
                ✎
              </span>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
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
}
