import { Component } from "@angular/core";
import { Router } from "@angular/router";
import type { EventItem } from "@/types";
import { AuthService } from "@/app/services/auth.service";
import { getEvents } from "@/lib/repositories/eventRepository";
import {
  getRegistrations,
  unregister as unregisterEvent,
} from "@/lib/repositories/registrationRepository";
import { EventCardComponent } from "@/app/features/events/event-card.component";
import { CarouselComponent } from "@/app/components/ui/carousel.component";

@Component({
  selector: "app-dashboard-page",
  standalone: true,
  imports: [EventCardComponent, CarouselComponent],
  templateUrl: "./dashboard-page.component.html",
})
export class DashboardPageComponent {
  private readonly events: EventItem[] = getEvents();
  registeredIds: string[] = getRegistrations();

  constructor(
    public auth: AuthService,
    private router: Router,
  ) {}

  get myEvents(): EventItem[] {
    return this.events.filter((event) => this.registeredIds.includes(event.id));
  }

  get upcomingEvents(): EventItem[] {
    return this.events.filter(
      (event) => !this.registeredIds.includes(event.id),
    );
  }

  openEvent(eventId: string): void {
    this.router.navigate(["/events", eventId]);
  }

  unregister(eventId: string): void {
    this.registeredIds = unregisterEvent(eventId);
  }
}
