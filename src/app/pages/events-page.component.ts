import { Component } from "@angular/core";
import { Router } from "@angular/router";
import type { EventItem } from "@/types";
import { getEvents } from "@/lib/repositories/eventRepository";
import { getRegistrations } from "@/lib/repositories/registrationRepository";
import { EventCardComponent } from "@/app/features/events/event-card.component";
import { EventFiltersComponent } from "@/app/features/events/event-filters.component";

@Component({
  selector: "app-events-page",
  standalone: true,
  imports: [EventCardComponent, EventFiltersComponent],
  template: `
    <div class="flex flex-col gap-6">
      <div>
        <div class="text-2xl font-semibold text-slate-800">Events</div>
        <div class="text-sm text-slate-400">Find something to attend.</div>
      </div>

      <app-event-filters
        [search]="search"
        (onSearchChange)="search = $event"
        [location]="location"
        (onLocationChange)="location = $event"
        [locations]="locations"
      />

      @if (filtered.length === 0) {
        <div
          class="rounded-lg border border-dashed border-slate-300 p-10 text-center text-sm text-slate-400"
        >
          No events match your filters.
        </div>
      } @else {
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          @for (event of filtered; track event.id) {
            <app-event-card
              [event]="event"
              [clickable]="true"
              [badge]="registeredIds.includes(event.id) ? 'Going' : undefined"
              (open)="openEvent($event)"
            />
          }
        </div>
      }
    </div>
  `,
})
export class EventsPageComponent {
  private readonly events: EventItem[] = getEvents();
  readonly registeredIds: string[] = getRegistrations();

  search = "";
  location = "";

  constructor(private router: Router) {}

  get locations(): string[] {
    return Array.from(
      new Set(this.events.map((event) => event.location)),
    ).sort();
  }

  get filtered(): EventItem[] {
    const term = this.search.trim().toLowerCase();
    return this.events.filter((event) => {
      const matchesTerm =
        term === "" || event.name.toLowerCase().includes(term);
      const matchesLocation =
        this.location === "" || event.location === this.location;
      return matchesTerm && matchesLocation;
    });
  }

  openEvent(eventId: string): void {
    this.router.navigate(["/events", eventId]);
  }
}
