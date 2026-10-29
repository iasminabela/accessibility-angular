import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";

interface ChatMessage {
  from: "bot" | "user";
  text: string;
}

/**
 * NOTE (workshop): this "Eva" support chatbot has intentionally planted chatbot
 * accessibility issues, based on
 * https://www.makethingsaccessible.com/guides/chatbots-and-web-accessibility-addressing-usability-issues-and-embracing-inclusive-design/
 */

const CANNED_REPLIES: { match: RegExp; reply: string }[] = [
  {
    match: /ticket|buy|book|payment|pay/i,
    reply:
      "You can buy tickets from any event's detail page using the Buy Ticket button. Need anything else?",
  },
  {
    match: /refund|cancel/i,
    reply:
      "Refunds are handled by the event organiser. Try contacting them from the event page.",
  },
  {
    match: /login|password|account|sign/i,
    reply:
      "You can sign in from the Login page. Use the demo accounts shown there if you're just exploring.",
  },
  {
    match: /event|when|where|date/i,
    reply:
      "Browse everything on the Events page — you can filter by category and date there.",
  },
];

function getReply(text: string): string {
  const found = CANNED_REPLIES.find((r) => r.match.test(text));
  return (
    found?.reply ??
    "Thanks for your message! One of our virtual assistants will get back to you shortly."
  );
}

@Component({
  selector: "app-chatbot-widget",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./chatbot-widget.component.html",
})
export class ChatbotWidgetComponent
  implements OnInit, AfterViewChecked, OnDestroy
{
  open = false;
  draft = "";
  messages: ChatMessage[] = [
    {
      from: "bot",
      text: "Hi there! 👋 I'm Eva, your event assistant. How can I help?",
    },
  ];

  @ViewChild("list") private listRef?: ElementRef<HTMLDivElement>;

  private openTimer?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    // Pop-up appears on its own a moment after load, interrupting the user.
    this.openTimer = setTimeout(() => (this.open = true), 10000);
  }

  ngAfterViewChecked(): void {
    // Keep the transcript scrolled to the newest message.
    if (this.listRef) {
      this.listRef.nativeElement.scrollTop =
        this.listRef.nativeElement.scrollHeight;
    }
  }

  ngOnDestroy(): void {
    if (this.openTimer) {
      clearTimeout(this.openTimer);
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.send();
    }
  }

  send(): void {
    const text = this.draft.trim();
    if (!text) {
      return;
    }
    this.messages = [...this.messages, { from: "user", text }];
    this.draft = "";
    // Bot "thinks" and replies silently — no live-region announcement.
    setTimeout(() => {
      this.messages = [...this.messages, { from: "bot", text: getReply(text) }];
    }, 700);
  }
}
