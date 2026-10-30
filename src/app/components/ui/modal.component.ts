import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
} from "@angular/core";

// Elements with tabindex="-1" (e.g. dropdown options reached by arrow keys) are not Tab stops.
const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]",
]
  .map((selector) => `${selector}:not([tabindex='-1'])`)
  .join(", ");

/**
 * Accessible modal built on the native <dialog> element.
 * On open it moves focus inside, keeps Tab cycling within the dialog,
 * and returns focus to whatever opened it once it closes.
 */
@Component({
  selector: "app-modal",
  standalone: true,
  templateUrl: "./modal.component.html",
})
export class ModalComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() open = false;
  @Input() title = "";
  @Output() close = new EventEmitter<void>();

  @ViewChild("dialog", { static: true })
  private dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild("body", { static: true })
  private body!: ElementRef<HTMLElement>;

  private static nextId = 0;
  readonly titleId = `modal-title-${ModalComponent.nextId++}`;

  private returnFocusTo: HTMLElement | null = null;
  private viewReady = false;

  ngOnChanges(): void {
    if (this.viewReady) {
      this.sync();
    }
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.sync();
  }

  ngOnDestroy(): void {
    // Components that render the modal behind an @if destroy it instead of setting open=false.
    this.restoreFocus();
  }

  /** Escape closes the modal, unless a widget inside (e.g. a dropdown) already handled it. */
  onEscape(event: Event): void {
    if (!event.defaultPrevented) {
      this.close.emit();
    }
  }

  trapFocus(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    const focusable = this.focusableElements();
    if (focusable.length === 0) {
      keyboardEvent.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (keyboardEvent.shiftKey && active === first) {
      keyboardEvent.preventDefault();
      last.focus();
    } else if (!keyboardEvent.shiftKey && active === last) {
      keyboardEvent.preventDefault();
      first.focus();
    }
  }

  private sync(): void {
    const dialog = this.dialog.nativeElement;
    if (this.open && !dialog.open) {
      this.returnFocusTo = document.activeElement as HTMLElement | null;
      dialog.showModal();
      // Land on the first field/button of the content rather than the × button.
      const firstInBody = this.body.nativeElement.querySelector<HTMLElement>(FOCUSABLE);
      (firstInBody ?? this.focusableElements()[0] ?? dialog).focus();
    } else if (!this.open && dialog.open) {
      dialog.close();
      this.restoreFocus();
    }
  }

  private restoreFocus(): void {
    const target = this.returnFocusTo;
    this.returnFocusTo = null;
    if (target?.isConnected) {
      target.focus();
    }
  }

  private focusableElements(): HTMLElement[] {
    return Array.from(
      this.dialog.nativeElement.querySelectorAll<HTMLElement>(FOCUSABLE),
    );
  }
}
