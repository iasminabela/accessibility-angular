import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
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

  @ViewChild("trigger", { static: true })
  private trigger!: ElementRef<HTMLButtonElement>;

  optionId(index: number): string {
    return `${this.listId}-${index}`;
  }

  toggle(): void {
    if (this.open) {
      this.open = false;
    } else {
      this.openAndFocus(this.selectedIndex());
    }
  }

  select(next: string): void {
    this.valueChange.emit(next);
    this.open = false;
    this.trigger.nativeElement.focus();
  }

  /** Arrow keys on the closed trigger open the list, like a native select. */
  onTriggerKeydown(event: KeyboardEvent): void {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const start = this.selectedIndex();
      this.openAndFocus(
        start >= 0 ? start : event.key === "ArrowUp" ? this.options.length - 1 : 0,
      );
    }
  }

  onListKeydown(event: KeyboardEvent): void {
    const count = this.options.length;
    const current = this.focusedIndex();
    let next: number | null = null;

    switch (event.key) {
      case "ArrowDown":
        next = (current + 1) % count;
        break;
      case "ArrowUp":
        next = (current - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
    }

    if (next !== null) {
      event.preventDefault();
      this.focusOption(next);
    }
  }

  /** Escape closes an open list only, so a surrounding modal stays open. */
  onEscape(event: Event): void {
    if (this.open) {
      event.preventDefault();
      this.open = false;
      this.trigger.nativeElement.focus();
    }
  }

  private openAndFocus(index: number): void {
    this.open = true;
    // Wait for the list to render before moving focus into it.
    setTimeout(() => this.focusOption(Math.max(index, 0)));
  }

  private focusOption(index: number): void {
    document.getElementById(this.optionId(index))?.focus();
  }

  private selectedIndex(): number {
    return this.options.findIndex((option) => option.value === this.value);
  }

  private focusedIndex(): number {
    const activeId = document.activeElement?.id ?? "";
    return this.options.findIndex((_, i) => this.optionId(i) === activeId);
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
