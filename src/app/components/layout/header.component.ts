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

  handleLogout(): void {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
}
