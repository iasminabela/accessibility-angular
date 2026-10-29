import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ModalComponent } from "@/app/components/ui/modal.component";

@Component({
  selector: "app-session-timeout-modal",
  standalone: true,
  imports: [ModalComponent],
  templateUrl: "./session-timeout-modal.component.html",
})
export class SessionTimeoutModalComponent {
  @Input() open = false;
  @Input() secondsLeft = 0;
  @Output() stay = new EventEmitter<void>();
  @Output() logoutNow = new EventEmitter<void>();
}
