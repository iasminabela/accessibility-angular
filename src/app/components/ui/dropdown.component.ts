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
  templateUrl: "./dropdown.component.html",
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
