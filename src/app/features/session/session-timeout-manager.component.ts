import { Component, NgZone, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@/app/services/auth.service";
import { SESSION_TIMEOUT_MS, WARNING_BEFORE_MS } from "@/lib/session-timeout";
import { SessionTimeoutModalComponent } from "./session-timeout-modal.component";

@Component({
  selector: "app-session-timeout-manager",
  standalone: true,
  imports: [SessionTimeoutModalComponent],
  template: `
    <app-session-timeout-modal
      [open]="showWarning"
      [secondsLeft]="secondsLeft"
      (stay)="stayLoggedIn()"
      (logoutNow)="handleExpire()"
    />
  `,
})
export class SessionTimeoutManagerComponent implements OnInit, OnDestroy {
  showWarning = false;
  secondsLeft = Math.round(WARNING_BEFORE_MS / 1000);

  private logoutTimer: ReturnType<typeof setTimeout> | null = null;
  private warningTimer: ReturnType<typeof setTimeout> | null = null;
  private countdownInterval: ReturnType<typeof setInterval> | null = null;

  private readonly handleActivity = () => this.startTimers();

  constructor(
    private auth: AuthService,
    private router: Router,
    private zone: NgZone,
  ) {}

  ngOnInit(): void {
    this.startTimers();
    window.addEventListener("mousemove", this.handleActivity);
    window.addEventListener("mousedown", this.handleActivity);
  }

  ngOnDestroy(): void {
    this.clearAllTimers();
    window.removeEventListener("mousemove", this.handleActivity);
    window.removeEventListener("mousedown", this.handleActivity);
  }

  handleExpire(): void {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }

  stayLoggedIn(): void {
    this.startTimers();
  }

  private clearAllTimers(): void {
    if (this.logoutTimer) clearTimeout(this.logoutTimer);
    if (this.warningTimer) clearTimeout(this.warningTimer);
    if (this.countdownInterval) clearInterval(this.countdownInterval);
  }

  private startTimers(): void {
    this.clearAllTimers();
    this.showWarning = false;

    this.warningTimer = setTimeout(() => {
      this.zone.run(() => {
        this.showWarning = true;
        this.secondsLeft = Math.round(WARNING_BEFORE_MS / 1000);

        this.countdownInterval = setInterval(() => {
          this.zone.run(() => {
            this.secondsLeft = Math.max(0, this.secondsLeft - 1);
          });
        }, 1000);
      });
    }, SESSION_TIMEOUT_MS - WARNING_BEFORE_MS);

    this.logoutTimer = setTimeout(() => {
      this.zone.run(() => {
        this.clearAllTimers();
        this.showWarning = false;
        this.handleExpire();
      });
    }, SESSION_TIMEOUT_MS);
  }
}
