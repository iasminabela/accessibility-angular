import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  TemplateRef,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { CarouselState } from "@/lib/carousel-state";

const FOCUSABLE = "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])";

/**
 * Simple windowed carousel. Left/Right arrow keys move focus between cards,
 * paging automatically when focus moves past the visible ones.
 */
@Component({
  selector: "app-carousel",
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: "./carousel.component.html",
})
export class CarouselComponent<T> implements OnChanges {
  @Input() items: T[] = [];
  @Input() perView = 4;
  /** Accessible name for the carousel region, e.g. "Upcoming events". */
  @Input() label = "Carousel";

  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<{ $implicit: T }>;

  state = new CarouselState<T>([], this.perView);

  constructor(
    private host: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnChanges(): void {
    // Callers may pass a freshly built array on every change detection, so keep
    // the current position instead of jumping back to the first page.
    const startIndex = this.state.startIndex;
    this.state = new CarouselState<T>(this.items ?? [], this.perView);
    this.state.startIndex = Math.min(startIndex, this.state.maxStart);
  }

  onArrowKey(event: Event, direction: 1 | -1): void {
    const slots = this.slots();
    const slotIndex = slots.findIndex((slot) =>
      slot.contains(document.activeElement),
    );

    // Focus is on the prev/next buttons: just page.
    if (slotIndex === -1) {
      event.preventDefault();
      if (direction === 1) {
        this.state.next();
      } else {
        this.state.prev();
      }
      return;
    }

    const target = this.state.startIndex + slotIndex + direction;
    if (target < 0 || target >= this.state.items.length) {
      return;
    }
    event.preventDefault();

    const visibleEnd = this.state.startIndex + slots.length;
    if (target < this.state.startIndex || target >= visibleEnd) {
      if (direction === 1) {
        this.state.next();
      } else {
        this.state.prev();
      }
      // Render the new page before moving focus into it.
      this.cdr.detectChanges();
    }
    this.focusSlot(target - this.state.startIndex);
  }

  arrowClasses(enabled: boolean): string {
    const base =
      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-400 text-lg";
    const state = enabled
      ? "cursor-pointer text-slate-700 hover:bg-slate-100"
      : "cursor-not-allowed text-slate-400";
    return `${base} ${state}`;
  }

  private slots(): HTMLElement[] {
    return Array.from(
      this.host.nativeElement.querySelectorAll<HTMLElement>(
        "[data-carousel-slot]",
      ),
    );
  }

  private focusSlot(index: number): void {
    this.slots()[index]?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
  }
}
