import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import type { NewEventInput } from "@/types";
import { ModalComponent } from "@/app/components/ui/modal.component";
import { ButtonComponent } from "@/app/components/ui/button.component";
import { TextFieldComponent } from "@/app/components/ui/text-field.component";
import { readFileAsDataUrl } from "@/lib/file";
import { validateNewEvent, type ValidationErrors } from "@/lib/validation";

const EMPTY_FORM: NewEventInput = {
  name: "",
  description: "",
  location: "",
  image: "",
  startDateTime: "",
  endDateTime: "",
  price: 0,
  maxPeople: 1,
};

@Component({
  selector: "app-add-event-modal",
  standalone: true,
  imports: [FormsModule, ModalComponent, ButtonComponent, TextFieldComponent],
  template: `
    <app-modal [open]="open" title="Add event" (close)="close.emit()">
      <form (ngSubmit)="handleSubmit()" class="flex flex-col gap-4">
        <app-text-field
          label="Event name"
          [(value)]="form.name"
          [error]="errors.name || ''"
        />

        <div class="flex flex-col gap-1">
          <span class="text-sm font-medium text-slate-700">Image</span>
          <input
            type="file"
            accept="image/*"
            (change)="handleImage($any($event.target).files)"
          />
          @if (form.image) {
            <img
              [src]="form.image"
              class="mt-2 h-24 w-40 rounded object-cover"
            />
          }
          @if (errors.image) {
            <span class="text-xs text-red-500">{{ errors.image }}</span>
          }
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-1">
            <span class="text-sm font-medium text-slate-700">Starts</span>
            <input
              type="datetime-local"
              [(ngModel)]="form.startDateTime"
              name="startDateTime"
              class="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800"
            />
            @if (errors.startDateTime) {
              <span class="text-xs text-red-500">{{
                errors.startDateTime
              }}</span>
            }
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-sm font-medium text-slate-700">Ends</span>
            <input
              type="datetime-local"
              [(ngModel)]="form.endDateTime"
              name="endDateTime"
              class="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800"
            />
            @if (errors.endDateTime) {
              <span class="text-xs text-red-500">{{ errors.endDateTime }}</span>
            }
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <app-text-field
            label="Price (€)"
            type="number"
            [min]="0"
            [(value)]="form.price"
            [error]="errors.price || ''"
          />
          <app-text-field
            label="Max people"
            type="number"
            [min]="1"
            [(value)]="form.maxPeople"
            [error]="errors.maxPeople || ''"
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
          <app-button type="submit">Create event</app-button>
        </div>
      </form>
    </app-modal>
  `,
})
export class AddEventModalComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<NewEventInput>();

  form: NewEventInput = { ...EMPTY_FORM };
  errors: ValidationErrors<NewEventInput> = {};

  async handleImage(fileList: FileList | null): Promise<void> {
    const file = fileList?.[0];
    if (!file) {
      return;
    }
    const dataUrl = await readFileAsDataUrl(file);
    this.form.image = dataUrl;
  }

  handleSubmit(): void {
    const validation = validateNewEvent(this.form);
    this.errors = validation;
    if (Object.keys(validation).length > 0) {
      return;
    }
    this.create.emit(this.form);
    this.form = { ...EMPTY_FORM };
    this.close.emit();
  }
}
