import { Component, EventEmitter, Input, Output } from "@angular/core";
import type { EventItem } from "@/types";
import { formatCurrency, formatDate } from "@/lib/format";

@Component({
  selector: "app-event-card",
  standalone: true,
  template: `
    <div (click)="clickable ? open.emit(event.id) : null" [class]="cardClasses">
      @if (dismissable) {
        <button
          type="button"
          (click)="dismiss.emit(event.id)"
          class="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/60 text-white hover:bg-slate-900/80"
        >
          ×
        </button>
      }
      <div class="relative">
        <img [src]="event.image" class="h-36 w-full object-cover" />
        @if (badge) {
          <span
            class="absolute left-2 top-2 rounded bg-brand-500 px-2 py-0.5 text-xs font-medium text-white"
          >
            {{ badge }}
          </span>
        }
      </div>
      <div class="flex flex-1 flex-col gap-2 p-4">
        <div class="text-base font-semibold text-slate-800">
          {{ event.name }}
        </div>
        <div class="text-xs text-slate-400">{{ event.location }}</div>
        <div class="text-xs text-slate-500">
          {{ formatDate(event.startDateTime) }}
        </div>
        <div class="mt-auto pt-2 text-sm font-medium text-brand-600">
          {{ formatCurrency(event.price) }}
        </div>
      </div>
    </div>
  `,
})
export class EventCardComponent {
  @Input({ required: true }) event!: EventItem;
  @Input() badge?: string;
  @Input() clickable = false;
  @Input() dismissable = false;
  @Output() open = new EventEmitter<string>();
  @Output() dismiss = new EventEmitter<string>();

  readonly formatCurrency = formatCurrency;
  readonly formatDate = formatDate;

  get cardClasses(): string {
    const base =
      "relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white";
    const clickableClasses = this.clickable
      ? "cursor-pointer hover:border-brand-300 hover:shadow-md"
      : "";
    return `${base} ${clickableClasses}`;
  }
}
