import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import type { EventItem } from "@/types";
import { ModalComponent } from "@/app/components/ui/modal.component";
import { ButtonComponent } from "@/app/components/ui/button.component";
import { TextFieldComponent } from "@/app/components/ui/text-field.component";
import { formatCurrency } from "@/lib/format";

export interface PaymentResult {
  type: "success" | "error";
  text: string;
}

@Component({
  selector: "app-buy-ticket-modal",
  standalone: true,
  imports: [FormsModule, ModalComponent, ButtonComponent, TextFieldComponent],
  templateUrl: "./buy-ticket-modal.component.html",
})
export class BuyTicketModalComponent {
  @Input() open = false;
  @Input({ required: true }) event!: EventItem;
  @Input() result: PaymentResult | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() pay = new EventEmitter<void>();

  card = "";
  name = "";
  expiry = "";
  cvc = "";

  readonly formatCurrency = formatCurrency;

  handleSubmit(): void {
    this.pay.emit();
  }

  get cardError(): string {
    const isCardValid = /^\d{16}$/.test(this.card);
    return this.card !== "" && !isCardValid
      ? "Card number must be exactly 16 digits."
      : "";
  }

  get nameError(): string {
    const isNameValid = /^[A-Za-z\s]+$/.test(this.name.trim());
    return this.name !== "" && !isNameValid
      ? "Name must only contain letters."
      : "";
  }

  private get expiryFormatMatch(): RegExpExecArray | null {
    return /^(\d{2})\/(\d{2})$/.exec(this.expiry);
  }

  private get isExpiryDateValid(): boolean {
    const match = this.expiryFormatMatch;
    if (!match) {
      return false;
    }
    const month = Number(match[1]);
    const year = 2000 + Number(match[2]);
    if (month < 1 || month > 12) {
      return false;
    }
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    return (
      year > currentYear || (year === currentYear && month >= currentMonth)
    );
  }

  get expiryError(): string {
    if (this.expiry !== "" && this.expiryFormatMatch === null) {
      return "Enter the expiry date in MM/YY format.";
    }
    if (this.expiry !== "" && !this.isExpiryDateValid) {
      return "Enter a valid, non-expired date.";
    }
    return "";
  }

  get cvcError(): string {
    const isCvcValid = /^\d{3}$/.test(this.cvc);
    return this.cvc !== "" && !isCvcValid
      ? "CVC must be exactly 3 digits."
      : "";
  }

  get isComplete(): boolean {
    const isCardValid = /^\d{16}$/.test(this.card);
    const isNameValid = /^[A-Za-z\s]+$/.test(this.name.trim());
    const isExpiryValid =
      this.expiryFormatMatch !== null && this.isExpiryDateValid;
    const isCvcValid = /^\d{3}$/.test(this.cvc);
    return isCardValid && isNameValid && isExpiryValid && isCvcValid;
  }
}
