import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from "@angular/core";

export interface DropdownOption {
  label: string;
  value: string;
}

/**
 * Custom dropdown built from <div>s.
 */
@Component({
  selector: "app-dropdown",
  standalone: true,
  template: `
    <div class="relative w-56">
      <div
        (click)="toggle()"
        class="flex cursor-pointer items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
      >
        <span [class]="selected ? '' : 'text-slate-400'">
          {{ selected ? selected.label : placeholder }}
        </span>
        <span class="text-slate-400">▾</span>
      </div>

      @if (open) {
        <div
          class="absolute z-20 mt-1 w-full overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg"
        >
          @for (option of options; track option.value) {
            <div
              (click)="select(option.value)"
              class="cursor-pointer px-3 py-2 text-sm text-slate-700 hover:bg-brand-50"
            >
              {{ option.label }}
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class DropdownComponent {
  @Input() options: DropdownOption[] = [];
  @Input() value: string = "";
  @Input() placeholder = "Select…";
  @Output() valueChange = new EventEmitter<string>();

  open = false;

  constructor(private host: ElementRef<HTMLElement>) {}

  get selected(): DropdownOption | undefined {
    return this.options.find((option) => option.value === this.value);
  }

  toggle(): void {
    this.open = !this.open;
  }

  select(next: string): void {
    this.valueChange.emit(next);
    this.open = false;
  }

  @HostListener("document:mousedown", ["$event"])
  onDocumentMouseDown(event: MouseEvent): void {
    if (this.open && !this.host.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }
}
