import {
  Component,
  ContentChild,
  Input,
  OnChanges,
  TemplateRef,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { CarouselState } from "@/lib/carousel-state";

/**
 * Simple windowed carousel.
 */
@Component({
  selector: "app-carousel",
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <div class="flex items-center gap-3">
      <div
        (click)="state.canGoPrev ? state.prev() : null"
        [class]="arrowClasses(state.canGoPrev)"
      >
        ‹
      </div>

      <div class="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        @for (item of state.visibleItems; track item) {
          <div>
            <ng-container
              [ngTemplateOutlet]="itemTemplate"
              [ngTemplateOutletContext]="{ $implicit: item }"
            ></ng-container>
          </div>
        }
      </div>

      <div
        (click)="state.canGoNext ? state.next() : null"
        [class]="arrowClasses(state.canGoNext)"
      >
        ›
      </div>
    </div>
  `,
})
export class CarouselComponent<T> implements OnChanges {
  @Input() items: T[] = [];
  @Input() perView = 4;

  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<{ $implicit: T }>;

  state = new CarouselState<T>([], this.perView);

  ngOnChanges(): void {
    this.state = new CarouselState<T>(this.items ?? [], this.perView);
  }

  arrowClasses(enabled: boolean): string {
    const base =
      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-lg";
    const state = enabled
      ? "cursor-pointer text-slate-600 hover:bg-slate-100"
      : "text-slate-300";
    return `${base} ${state}`;
  }
}
