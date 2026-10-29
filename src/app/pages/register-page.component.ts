import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import type { RegisterInput } from "@/types";
import { AuthService } from "@/app/services/auth.service";
import { ButtonComponent } from "@/app/components/ui/button.component";
import { TextFieldComponent } from "@/app/components/ui/text-field.component";
import { validateRegister, type ValidationErrors } from "@/lib/validation";

const EMPTY_FORM: RegisterInput = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  isAdmin: false,
};

@Component({
  selector: "app-register-page",
  standalone: true,
  imports: [FormsModule, RouterLink, ButtonComponent, TextFieldComponent],
  templateUrl: "./register-page.component.html",
})
export class RegisterPageComponent {
  form: RegisterInput = { ...EMPTY_FORM };
  errors: ValidationErrors<RegisterInput> = {};
  formError = "";

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  handleSubmit(): void {
    const validation = validateRegister(this.form);
    this.errors = validation;
    if (Object.keys(validation).length > 0) {
      return;
    }
    const result = this.auth.register(this.form);
    if (result.ok) {
      this.router.navigate(["/dashboard"]);
    } else {
      this.formError = result.error ?? "Unable to create the account.";
    }
  }
}
