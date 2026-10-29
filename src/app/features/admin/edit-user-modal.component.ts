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
  templateUrl: "./edit-user-modal.component.html",
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
