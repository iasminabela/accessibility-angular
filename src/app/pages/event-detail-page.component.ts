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
  templateUrl: "./event-detail-page.component.html",
})
export class EventDetailPageComponent implements OnInit {
  event: EventItem | undefined;
  registered = false;
  modalOpen = false;
  result: PaymentResult | null = null;
  /** Read out politely by the page status region after a successful registration. */
  announcement = "";

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
        this.announcement = `Payment successful. You are registered for ${this.event.name}.`;
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
