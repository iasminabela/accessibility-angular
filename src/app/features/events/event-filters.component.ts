import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  DropdownComponent,
  type DropdownOption,
} from "@/app/components/ui/dropdown.component";

@Component({
  selector: "app-event-filters",
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: "./event-filters.component.html",
})
export class EventFiltersComponent {
  @Input() search = "";
  @Input() location = "";
  @Input() locations: string[] = [];
  @Output() onSearchChange = new EventEmitter<string>();
  @Output() onLocationChange = new EventEmitter<string>();

  get locationOptions(): DropdownOption[] {
    return this.locations.map((value) => ({ label: value, value }));
  }

  clear(): void {
    this.onSearchChange.emit("");
    this.onLocationChange.emit("");
  }
}
