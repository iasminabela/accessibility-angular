import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

/**
 * Basic labelled text input used across the forms.
 */
@Component({
  selector: "app-text-field",
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="flex flex-col gap-1">
      <span class="text-sm font-medium text-slate-700">{{ label }}</span>
      <input
        [type]="type"
        [attr.min]="min"
        [placeholder]="placeholder"
        [readOnly]="readOnly"
        [disabled]="disabled"
        [ngModel]="value"
        (ngModelChange)="valueChange.emit($event)"
        [class]="inputClasses"
      />
      @if (error) {
        <span class="text-xs text-red-500">{{ error }}</span>
      }
    </div>
  `,
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
