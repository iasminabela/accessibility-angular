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
  template: `
    <div class="flex flex-col gap-10">
      <div>
        <div class="text-2xl font-semibold text-slate-800">
          Hello, {{ auth.currentUser()?.name?.split(" ")?.[0] }}
        </div>
        <div class="text-sm text-slate-400">
          Here is what is happening with your events.
        </div>
      </div>

      <section class="flex flex-col gap-4">
        <div class="text-lg font-semibold text-slate-800">My events</div>
        @if (myEvents.length === 0) {
          <div
            class="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-400"
          >
            You have not signed up for any events yet.
          </div>
        } @else {
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            @for (event of myEvents; track event.id) {
              <app-event-card
                [event]="event"
                [clickable]="true"
                [dismissable]="true"
                badge="Going"
                (open)="openEvent($event)"
                (dismiss)="unregister($event)"
              />
            }
          </div>
        }
      </section>

      <section class="flex flex-col gap-4">
        <div class="text-lg font-semibold text-slate-800">Upcoming events</div>
        <app-carousel [items]="upcomingEvents" [perView]="4">
          <ng-template let-event>
            <app-event-card
              [event]="event"
              [clickable]="true"
              (open)="openEvent($event)"
            />
          </ng-template>
        </app-carousel>
      </section>
    </div>
  `,
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
