import { Component } from "@angular/core";
import type { EventItem, NewEventInput } from "@/types";
import { getEvents, addEvent } from "@/lib/repositories/eventRepository";
import { ButtonComponent } from "@/app/components/ui/button.component";
import { EventCardComponent } from "@/app/features/events/event-card.component";
import { AddEventModalComponent } from "@/app/features/admin/add-event-modal.component";

@Component({
  selector: "app-admin-events-page",
  standalone: true,
  imports: [ButtonComponent, EventCardComponent, AddEventModalComponent],
  templateUrl: "./admin-events-page.component.html",
})
export class AdminEventsPageComponent {
  events: EventItem[] = getEvents();
  modalOpen = false;

  handleCreate(input: NewEventInput): void {
    addEvent(input);
    this.events = getEvents();
  }
}
