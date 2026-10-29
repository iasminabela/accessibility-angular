import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { resetSeedData } from "@/lib/seed";

@Component({
  selector: "app-footer",
  standalone: true,
  templateUrl: "./footer.component.html",
})
export class FooterComponent {
  constructor(private router: Router) {}

  // Hidden facilitator convenience: wipes localStorage and reseeds demo data.
  handleReset(): void {
    resetSeedData();
    this.router.navigate(["/login"]);
    window.location.reload();
  }
}
