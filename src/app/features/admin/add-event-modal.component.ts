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
  templateUrl: "./add-event-modal.component.html",
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
