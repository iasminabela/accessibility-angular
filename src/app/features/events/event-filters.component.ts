import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  DropdownComponent,
  type DropdownOption,
} from "@/app/components/ui/dropdown.component";

@Component({
  selector: "app-event-filters",
  standalone: true,
  imports: [DropdownComponent],
  template: `
    <div class="flex flex-wrap items-end gap-4">
      <div class="flex flex-col gap-1">
        <span class="text-xs font-medium text-slate-500">Search</span>
        <input
          [value]="search"
          (input)="onSearchChange.emit($any($event.target).value)"
          placeholder="Search events"
          class="w-64 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400"
        />
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-xs font-medium text-slate-500">Location</span>
        <app-dropdown
          [options]="locationOptions"
          [value]="location"
          (valueChange)="onLocationChange.emit($event)"
          placeholder="All locations"
        />
      </div>

      @if (search || location) {
        <span
          (click)="clear()"
          class="cursor-pointer pb-2 text-sm text-slate-400 hover:text-slate-600"
        >
          ✕
        </span>
      }
    </div>
  `,
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
