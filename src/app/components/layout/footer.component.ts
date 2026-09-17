import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { resetSeedData } from "@/lib/seed";

@Component({
  selector: "app-footer",
  standalone: true,
  template: `
    <div class="mt-16 border-t border-slate-200 bg-white">
      <div
        class="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-xs text-slate-400"
      >
        <span>© 2026 Eventer — a demo app for the accessibility workshop.</span>
        <span
          (click)="handleReset()"
          class="cursor-pointer text-slate-300 hover:text-slate-500"
          title="Reset demo data"
        >
          reset
        </span>
      </div>
    </div>
  `,
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
