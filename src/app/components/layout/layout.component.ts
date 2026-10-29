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
  templateUrl: "./layout.component.html",
})
export class LayoutComponent {}
