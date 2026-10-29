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
  templateUrl: "./events-page.component.html",
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
