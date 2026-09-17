import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import type { EventItem } from "@/types";
import { findEventById } from "@/lib/repositories/eventRepository";
import {
  isRegistered as isRegisteredInStore,
  register as registerEvent,
} from "@/lib/repositories/registrationRepository";
import { ButtonComponent } from "@/app/components/ui/button.component";
import {
  BuyTicketModalComponent,
  type PaymentResult,
} from "@/app/features/events/buy-ticket-modal.component";
import { NotFoundPageComponent } from "@/app/pages/not-found-page.component";
import { formatCurrency, formatDateTime } from "@/lib/format";

@Component({
  selector: "app-event-detail-page",
  standalone: true,
  imports: [ButtonComponent, BuyTicketModalComponent, NotFoundPageComponent],
  template: `
    @if (!event) {
      <app-not-found-page />
    } @else {
      <div class="flex flex-col gap-6">
        <span
          (click)="goBack()"
          class="cursor-pointer text-sm text-slate-400 hover:text-slate-600"
        >
          ‹ Back
        </span>

        <div
          class="overflow-hidden rounded-xl border border-slate-200 bg-white"
        >
          <img [src]="event.image" class="h-64 w-full object-cover" />
          <div class="flex flex-col gap-4 p-6">
            <div class="text-2xl font-semibold text-slate-800">
              {{ event.name }}
            </div>
            <div class="flex flex-wrap gap-6 text-sm text-slate-500">
              <span>{{ event.location }}</span>
              <span>{{ formatDateTime(event.startDateTime) }}</span>
              <span>Ends {{ formatDateTime(event.endDateTime) }}</span>
              <span>Up to {{ event.maxPeople }} people</span>
            </div>
            <p class="text-sm leading-relaxed text-slate-600">
              {{ event.description }}
            </p>

            <div
              class="flex items-center justify-between border-t border-slate-100 pt-4"
            >
              <span class="text-xl font-semibold text-brand-600">
                {{ formatCurrency(event.price) }}
              </span>
              @if (registered) {
                <span
                  class="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700"
                >
                  You are going
                </span>
              } @else {
                <app-button (clicked)="openModal()">Buy ticket</app-button>
              }
            </div>
          </div>
        </div>

        <app-buy-ticket-modal
          [open]="modalOpen"
          [event]="event"
          [result]="result"
          (close)="modalOpen = false"
          (pay)="handlePay()"
        />
      </div>
    }
  `,
})
export class EventDetailPageComponent implements OnInit {
  event: EventItem | undefined;
  registered = false;
  modalOpen = false;
  result: PaymentResult | null = null;

  readonly formatCurrency = formatCurrency;
  readonly formatDateTime = formatDateTime;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get("eventId") ?? undefined;
    this.event = findEventById(eventId);
    if (this.event) {
      this.registered = isRegisteredInStore(this.event.id);
    }
  }

  goBack(): void {
    this.location.back();
  }

  openModal(): void {
    this.result = null;
    this.modalOpen = true;
  }

  handlePay(): void {
    if (!this.event) {
      return;
    }
    switch (this.event.paymentOutcome) {
      case "success":
        registerEvent(this.event.id);
        this.registered = true;
        this.result = {
          type: "success",
          text: "Payment successful. See you there!",
        };
        this.modalOpen = false;
        break;
      case "error":
        this.result = {
          type: "error",
          text: "Your payment could not be processed. Please try again.",
        };
        break;
      case "notfound":
        // Broken checkout link — routes to a page that does not exist (404).
        this.router.navigate(["/checkout", this.event.id, "confirm"]);
        break;
    }
  }
}
