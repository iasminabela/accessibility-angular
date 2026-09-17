import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from "@angular/core";
import type { User, UserRole } from "@/types";
import { USER_ROLES } from "@/types";
import { FormsModule } from "@angular/forms";
import { ModalComponent } from "@/app/components/ui/modal.component";
import { ButtonComponent } from "@/app/components/ui/button.component";
import { TextFieldComponent } from "@/app/components/ui/text-field.component";
import {
  DropdownComponent,
  type DropdownOption,
} from "@/app/components/ui/dropdown.component";

const ROLE_OPTIONS: DropdownOption[] = USER_ROLES.map((role) => ({
  label: role,
  value: role,
}));

@Component({
  selector: "app-edit-user-modal",
  standalone: true,
  imports: [
    FormsModule,
    ModalComponent,
    ButtonComponent,
    TextFieldComponent,
    DropdownComponent,
  ],
  template: `
    @if (user) {
      <app-modal
        [open]="true"
        [title]="'Edit ' + user.name"
        (close)="close.emit()"
      >
        <form (ngSubmit)="handleSubmit()" class="flex flex-col gap-4">
          <app-text-field
            label="Name"
            [value]="name"
            (valueChange)="onNameChange($event)"
            [error]="error"
          />

          <app-text-field
            label="Email"
            [value]="user.email"
            [readOnly]="true"
            [disabled]="true"
          />

          <div class="flex flex-col gap-1">
            <span class="text-sm font-medium text-slate-700">Role</span>
            <app-dropdown
              [options]="roleOptions"
              [value]="role"
              (valueChange)="role = $any($event)"
            />
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <app-button
              type="button"
              variant="secondary"
              (clicked)="close.emit()"
            >
              Cancel
            </app-button>
            <app-button type="submit" [disabled]="!isNameValid">
              Save changes
            </app-button>
          </div>
        </form>
      </app-modal>
    }
  `,
})
export class EditUserModalComponent implements OnChanges {
  @Input() user: User | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{
    id: string;
    changes: { name: string; role: UserRole };
  }>();

  name = "";
  role: UserRole = "Attendee";
  error = "";

  readonly roleOptions = ROLE_OPTIONS;

  ngOnChanges(): void {
    if (this.user) {
      this.name = this.user.name;
      this.role = this.user.role;
      this.error = "";
    }
  }

  get isNameValid(): boolean {
    return this.name.trim() !== "";
  }

  onNameChange(value: string | number): void {
    this.name = String(value);
    if (this.error) {
      this.error = "";
    }
  }

  handleSubmit(): void {
    if (!this.user) {
      return;
    }
    if (!this.isNameValid) {
      this.error = "Name is required.";
      return;
    }
    this.save.emit({
      id: this.user.id,
      changes: { name: this.name.trim(), role: this.role },
    });
    this.close.emit();
  }
}
