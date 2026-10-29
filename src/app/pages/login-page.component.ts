import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "@/app/services/auth.service";
import { ButtonComponent } from "@/app/components/ui/button.component";
import { TextFieldComponent } from "@/app/components/ui/text-field.component";
import { DEMO_CREDENTIALS } from "@/data/seedUsers";

@Component({
  selector: "app-login-page",
  standalone: true,
  imports: [FormsModule, RouterLink, ButtonComponent, TextFieldComponent],
  templateUrl: "./login-page.component.html",
})
export class LoginPageComponent {
  email = "";
  password = "";
  error = "";

  readonly demo = DEMO_CREDENTIALS;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  handleSubmit(): void {
    const result = this.auth.login({
      email: this.email,
      password: this.password,
    });
    if (result.ok) {
      this.router.navigate(["/dashboard"]);
    } else {
      this.error = result.error ?? "Unable to log in.";
    }
  }
}
