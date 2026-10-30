import { Component, ElementRef, ViewChild } from "@angular/core";
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
  pendingEvent?: EventItem;

  @ViewChild("confirmDialog", { static: true })
  private confirmDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild("myEventsHeading", { static: true })
  private myEventsHeading!: ElementRef<HTMLElement>;

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

  confirmUnregister(eventId: string): void {
    this.pendingEvent = this.events.find((event) => event.id === eventId);
    // Focus lands on Cancel first, the safe choice for a destructive action.
    this.confirmDialog.nativeElement.showModal();
  }

  // showModal() makes the page inert, but browsers still let Tab escape to the
  // address bar. Wrap focus between the first and last buttons instead.
  trapFocus(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    const focusable = Array.from(
      this.confirmDialog.nativeElement.querySelectorAll<HTMLElement>(
        "button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
      ),
    );
    if (focusable.length === 0) return;

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

  onConfirmDialogClose(): void {
    const dialog = this.confirmDialog.nativeElement;
    if (dialog.returnValue === "confirm" && this.pendingEvent) {
      this.registeredIds = unregisterEvent(this.pendingEvent.id);
      // The card (and its remove button) is gone, so move focus somewhere sensible.
      setTimeout(() => this.myEventsHeading.nativeElement.focus());
    }
    dialog.returnValue = "";
    this.pendingEvent = undefined;
  }
}
