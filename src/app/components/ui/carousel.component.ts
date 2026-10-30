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
  templateUrl: "./carousel.component.html",
})
export class CarouselComponent<T> implements OnChanges {
  @Input() items: T[] = [];
  @Input() perView = 4;

  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<{ $implicit: T }>;

  state = new CarouselState<T>([], this.perView);

  ngOnChanges(): void {
    // Callers may pass a freshly built array on every change detection, so keep
    // the current position instead of jumping back to the first page.
    const startIndex = this.state.startIndex;
    this.state = new CarouselState<T>(this.items ?? [], this.perView);
    this.state.startIndex = Math.min(startIndex, this.state.maxStart);
  }

  arrowClasses(enabled: boolean): string {
    const base =
      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-400 text-lg";
    const state = enabled
      ? "cursor-pointer text-slate-700 hover:bg-slate-100"
      : "cursor-not-allowed text-slate-400";
    return `${base} ${state}`;
  }
}
