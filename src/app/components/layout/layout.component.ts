import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./header.component";
import { FooterComponent } from "./footer.component";
import { ChatbotWidgetComponent } from "@/app/components/ui/chatbot-widget.component";
import { SessionTimeoutManagerComponent } from "@/app/features/session/session-timeout-manager.component";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ChatbotWidgetComponent,
    SessionTimeoutManagerComponent,
  ],
  template: `
    <div class="flex min-h-screen flex-col">
      <app-header />
      <div class="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <router-outlet></router-outlet>
      </div>
      <app-footer />
      <app-chatbot-widget />
      <app-session-timeout-manager />
    </div>
  `,
})
export class LayoutComponent {}
