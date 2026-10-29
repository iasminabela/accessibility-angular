import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-pagination",
  standalone: true,
  templateUrl: "./pagination.component.html",
})
export class PaginationComponent {
  @Input() page = 1;
  @Input() pageCount = 1;
  @Output() onPageChange = new EventEmitter<number>();

  get pages(): number[] {
    return Array.from({ length: this.pageCount }, (_, index) => index + 1);
  }
}
