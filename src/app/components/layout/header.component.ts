import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from "@/app/services/auth.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  adminMenuOpen = false;

  constructor(
    public auth: AuthService,
    private router: Router,
  ) {}

  /** Close the admin menu once keyboard focus leaves it. */
  onAdminFocusOut(event: FocusEvent): void {
    const container = event.currentTarget as HTMLElement;
    if (!container.contains(event.relatedTarget as Node | null)) {
      this.adminMenuOpen = false;
    }
  }

  handleLogout(): void {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
}
