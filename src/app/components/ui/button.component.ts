import { Component, EventEmitter, Input, Output } from "@angular/core";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 disabled:bg-brand-500/50",
  secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

@Component({
  selector: "app-button",
  standalone: true,
  templateUrl: "./button.component.html",
})
export class ButtonComponent {
  @Input() variant: Variant = "primary";
  @Input() type: "button" | "submit" | "reset" = "button";
  @Input() disabled = false;
  @Input() className = "";
  @Output() clicked = new EventEmitter<void>();

  get classes(): string {
    return `rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed ${VARIANT_CLASSES[this.variant]} ${this.className}`;
  }
}
