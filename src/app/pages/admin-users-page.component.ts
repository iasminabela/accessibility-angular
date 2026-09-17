import { Component, OnInit } from "@angular/core";
import type { User, UserRole } from "@/types";
import {
  deleteUsers as deleteUsersFromStore,
  getUsers,
  updateUser as updateUserInStore,
} from "@/lib/repositories/userRepository";
import { SortableData } from "@/lib/sortable-data";
import { PaginationState } from "@/lib/pagination-state";
import { ButtonComponent } from "@/app/components/ui/button.component";
import { PaginationComponent } from "@/app/components/ui/pagination.component";
import {
  UsersTableComponent,
  type UserSortKey,
} from "@/app/features/admin/users-table.component";
import { EditUserModalComponent } from "@/app/features/admin/edit-user-modal.component";

const PAGE_SIZE = 15;

const SORT_ACCESSORS: Record<UserSortKey, (user: User) => string> = {
  name: (user) => user.name.toLowerCase(),
  registeredAt: (user) => user.registeredAt,
};

@Component({
  selector: "app-admin-users-page",
  standalone: true,
  imports: [
    ButtonComponent,
    PaginationComponent,
    UsersTableComponent,
    EditUserModalComponent,
  ],
  template: `
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <div class="text-2xl font-semibold text-slate-800">Admin — users</div>
          <div class="text-sm text-slate-400">{{ rangeLabel }} users</div>
        </div>
        @if (selectionCount > 0) {
          <app-button variant="danger" (clicked)="handleDelete()">
            Delete account{{ selectionCount > 1 ? "s" : "" }} ({{
              selectionCount
            }})
          </app-button>
        }
      </div>

      <div class="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <app-users-table
          [users]="paginator.pageItems"
          [selectedIds]="selectedIds"
          [sort]="sortable.sort"
          (toggleSelect)="toggleSelect($event)"
          (toggleSort)="toggleSort($event)"
          (edit)="editing = $event"
        />
        <app-pagination
          [page]="paginator.page"
          [pageCount]="paginator.pageCount"
          (onPageChange)="paginator.goToPage($event)"
        />
      </div>

      <app-edit-user-modal
        [user]="editing"
        (close)="editing = null"
        (save)="handleSave($event)"
      />
    </div>
  `,
})
export class AdminUsersPageComponent implements OnInit {
  readonly sortable = new SortableData<User, UserSortKey>(
    getUsers(),
    SORT_ACCESSORS,
    { key: "name", direction: "asc" },
  );
  readonly paginator = new PaginationState<User>([], PAGE_SIZE);

  selectedIds = new Set<string>();
  editing: User | null = null;

  ngOnInit(): void {
    this.refresh();
  }

  private refresh(): void {
    this.paginator.items = this.sortable.sorted;
  }

  private reloadUsers(): void {
    this.sortable.items = getUsers();
    this.refresh();
  }

  toggleSort(key: UserSortKey): void {
    this.sortable.toggleSort(key);
    this.refresh();
  }

  toggleSelect(id: string): void {
    const next = new Set(this.selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this.selectedIds = next;
  }

  get selectionCount(): number {
    return this.selectedIds.size;
  }

  get rangeLabel(): string {
    const start = (this.paginator.page - 1) * PAGE_SIZE + 1;
    const end = Math.min(
      this.paginator.page * PAGE_SIZE,
      this.sortable.sorted.length,
    );
    return `${start}–${end} of ${this.sortable.sorted.length}`;
  }

  handleDelete(): void {
    deleteUsersFromStore([...this.selectedIds]);
    this.selectedIds = new Set();
    this.reloadUsers();
  }

  handleSave(event: {
    id: string;
    changes: { name: string; role: UserRole };
  }): void {
    updateUserInStore(event.id, event.changes);
    this.reloadUsers();
  }
}
