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
 * Custom dropdown: a toggle button revealing a list of option buttons.
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
  /** Id of the visible label element, so screen readers announce it with the trigger. */
  @Input() labelledBy?: string;
  @Output() valueChange = new EventEmitter<string>();

  open = false;

  private static nextId = 0;
  readonly triggerId = `dropdown-${DropdownComponent.nextId++}`;
  readonly listId = `${this.triggerId}-list`;

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

  /** Close the list once keyboard focus leaves the dropdown. */
  onFocusOut(event: FocusEvent): void {
    const container = event.currentTarget as HTMLElement;
    if (!container.contains(event.relatedTarget as Node | null)) {
      this.open = false;
    }
  }

  @HostListener("document:mousedown", ["$event"])
  onDocumentMouseDown(event: MouseEvent): void {
    if (this.open && !this.host.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }
}
