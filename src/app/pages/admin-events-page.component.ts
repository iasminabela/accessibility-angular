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
  template: `
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <div>
          <div class="text-2xl font-semibold text-slate-800">All events</div>
          <div class="text-sm text-slate-400">
            {{ events.length }} events in the platform.
          </div>
        </div>
        <app-button (clicked)="modalOpen = true">Add event</app-button>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        @for (event of events; track event.id) {
          <app-event-card [event]="event" />
        }
      </div>

      <app-add-event-modal
        [open]="modalOpen"
        (close)="modalOpen = false"
        (create)="handleCreate($event)"
      />
    </div>
  `,
})
export class AdminEventsPageComponent {
  events: EventItem[] = getEvents();
  modalOpen = false;

  handleCreate(input: NewEventInput): void {
    addEvent(input);
    this.events = getEvents();
  }
}
