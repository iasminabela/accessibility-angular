import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

/**
 * Basic labelled text input used across the forms.
 */
@Component({
  selector: "app-text-field",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./text-field.component.html",
})
export class TextFieldComponent {
  @Input() label = "";
  @Input() error = "";
  @Input() className = "";
  @Input() type = "text";
  @Input() placeholder = "";
  @Input() min: number | null = null;
  @Input() readOnly = false;
  @Input() disabled = false;
  @Input() value: string | number = "";
  @Output() valueChange = new EventEmitter<any>();

  get inputClasses(): string {
    return `rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 ${this.className}`;
  }
}
