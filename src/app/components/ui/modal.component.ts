import { Component, EventEmitter, Input, Output } from "@angular/core";

/**
 * Lightweight modal.
 */
@Component({
  selector: "app-modal",
  standalone: true,
  templateUrl: "./modal.component.html",
})
export class ModalComponent {
  @Input() open = false;
  @Input() title = "";
  @Output() close = new EventEmitter<void>();
}
