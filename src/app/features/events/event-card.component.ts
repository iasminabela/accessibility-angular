import { Component, EventEmitter, Input, Output } from "@angular/core";
import type { EventItem } from "@/types";
import { formatCurrency, formatDate } from "@/lib/format";

@Component({
  selector: "app-event-card",
  standalone: true,
  templateUrl: "./event-card.component.html",
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
