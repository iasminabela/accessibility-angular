import type { EventItem } from "@/types";

function img(seed: string): string {
  return `https://picsum.photos/seed/${seed}/640/420`;
}

/**
 * Curated static events.
 *
 * Payment outcomes are deterministic so the workshop can be demoed reliably:
 * - 3 events fail on payment (`error`)
 * - 1 event routes to a 404 on payment (`notfound`)
 * - the remaining events complete successfully (`success`)
 */
export function buildSeedEvents(): EventItem[] {
  return [
    {
      id: "evt-react-summit",
      name: "React Summit 2026",
      description:
        "A full day of talks about the React ecosystem, from server components to fine-grained reactivity.",
      location: "Berlin, DE",
      image: img("react-summit"),

      imageAlt: "Pine forest",
      startDateTime: "2026-09-14T09:00:00.000Z",
      endDateTime: "2026-09-14T17:00:00.000Z",
      price: 149,
      maxPeople: 500,
      paymentOutcome: "success",
    },
    {
      id: "evt-design-systems",
      name: "Design Systems Day",
      description:
        "How teams scale UI with tokens, components and documentation that people actually use.",
      location: "Amsterdam, NL",
      image: img("design-systems"),

      imageAlt: "Aerial view of a road",
      startDateTime: "2026-09-20T10:00:00.000Z",
      endDateTime: "2026-09-20T16:00:00.000Z",
      price: 99,
      maxPeople: 250,
      paymentOutcome: "success",
    },
    {
      id: "evt-a11y-conf",
      name: "Accessibility Conf",
      description:
        "Practical accessibility for engineers, designers and QA. Real audits, real fixes.",
      location: "London, UK",
      image: img("a11y-conf"),

      imageAlt: "Snow-covered mountain peak",
      startDateTime: "2026-10-02T09:30:00.000Z",
      endDateTime: "2026-10-02T18:00:00.000Z",
      price: 0,
      maxPeople: 300,
      paymentOutcome: "success",
    },
    {
      id: "evt-node-congress",
      name: "Node Congress — FAIL",
      description:
        "Backend patterns, streaming, and performance for modern Node.js applications.",
      location: "Lisbon, PT",
      image: img("node-congress"),

      imageAlt: "Tall buildings covered in hanging plants",
      startDateTime: "2026-10-11T09:00:00.000Z",
      endDateTime: "2026-10-11T17:30:00.000Z",
      price: 129,
      maxPeople: 400,
      paymentOutcome: "error",
    },
    {
      id: "evt-ts-workshop",
      name: "TypeScript Deep Dive",
      description:
        "A hands-on workshop covering advanced types, inference and library authoring.",
      location: "Vienna, AT",
      image: img("ts-workshop"),

      imageAlt: "Desk seen from above with a monitor, tablet, keyboard, mouse, glasses and a notebook",
      startDateTime: "2026-10-18T10:00:00.000Z",
      endDateTime: "2026-10-18T15:00:00.000Z",
      price: 199,
      maxPeople: 60,
      paymentOutcome: "success",
    },
    {
      id: "evt-css-carnival",
      name: "CSS Carnival",
      description:
        "Modern layout, container queries and the joyful weird side of CSS.",
      location: "Barcelona, ES",
      image: img("css-carnival"),

      imageAlt: "Rocky mountain with a snowy summit rising behind a calm lake",
      startDateTime: "2026-10-25T11:00:00.000Z",
      endDateTime: "2026-10-25T16:00:00.000Z",
      price: 79,
      maxPeople: 220,
      paymentOutcome: "success",
    },
    {
      id: "evt-jamstack",
      name: "Jamstack Live — FAIL",
      description:
        "Edge functions, static rendering and the modern content pipeline.",
      location: "Paris, FR",
      image: img("jamstack"),

      imageAlt: "Close-up of a turquoise ocean wave curling over",
      startDateTime: "2026-11-01T09:00:00.000Z",
      endDateTime: "2026-11-01T17:00:00.000Z",
      price: 119,
      maxPeople: 350,
      paymentOutcome: "error",
    },
    {
      id: "evt-testing-days",
      name: "Testing Days",
      description:
        "From unit to end-to-end: building confidence without slowing your team down.",
      location: "Copenhagen, DK",
      image: img("testing-days"),

      imageAlt: "Woman with long hair standing in a golden field at sunset",
      startDateTime: "2026-11-08T09:30:00.000Z",
      endDateTime: "2026-11-08T16:30:00.000Z",
      price: 109,
      maxPeople: 180,
      paymentOutcome: "success",
    },
    {
      id: "evt-graphql-galaxy",
      name: "GraphQL Galaxy — 404",
      description:
        "Schema design, federation and performance for GraphQL at scale.",
      location: "Dublin, IE",
      image: img("graphql-galaxy"),

      imageAlt: "Evergreen forest overlooking a blue sea with mountains on the horizon",
      startDateTime: "2026-11-15T10:00:00.000Z",
      endDateTime: "2026-11-15T17:00:00.000Z",
      price: 139,
      maxPeople: 300,
      paymentOutcome: "notfound",
    },
    {
      id: "evt-devops-world",
      name: "DevOps World",
      description:
        "Pipelines, observability and platform engineering that developers enjoy.",
      location: "Munich, DE",
      image: img("devops-world"),

      imageAlt: "Busy city street at night lit by bright billboards and neon signs",
      startDateTime: "2026-11-22T09:00:00.000Z",
      endDateTime: "2026-11-22T18:00:00.000Z",
      price: 159,
      maxPeople: 420,
      paymentOutcome: "success",
    },
    {
      id: "evt-pwa-forum",
      name: "PWA Forum",
      description:
        "Offline-first apps, installability and the modern web platform.",
      location: "Prague, CZ",
      image: img("pwa-forum"),

      imageAlt: "Long bridge stretching across calm water under a purple sky",
      startDateTime: "2026-11-29T10:00:00.000Z",
      endDateTime: "2026-11-29T15:30:00.000Z",
      price: 89,
      maxPeople: 200,
      paymentOutcome: "success",
    },
    {
      id: "evt-ai-frontend",
      name: "AI for Frontend — FAIL",
      description:
        "Pragmatic AI features in the browser without shipping the whole model.",
      location: "Stockholm, SE",
      image: img("ai-frontend"),

      imageAlt: "Person leaning on a railing, silhouetted against the setting sun",
      startDateTime: "2026-12-06T09:00:00.000Z",
      endDateTime: "2026-12-06T17:00:00.000Z",
      price: 149,
      maxPeople: 260,
      paymentOutcome: "error",
    },
    {
      id: "evt-webperf",
      name: "WebPerf Summit",
      description:
        "Core Web Vitals, rendering strategy and shipping fast experiences.",
      location: "Zurich, CH",
      image: img("webperf"),

      imageAlt: "Open photo book and a black notebook on a wooden table next to dried grass",
      startDateTime: "2026-12-13T09:30:00.000Z",
      endDateTime: "2026-12-13T16:00:00.000Z",
      price: 129,
      maxPeople: 240,
      paymentOutcome: "success",
    },
    {
      id: "evt-indie-hackers",
      name: "Indie Hackers Meetup",
      description:
        "Ship small, learn fast: a friendly evening of demos and lessons learned.",
      location: "Rotterdam, NL",
      image: img("indie-hackers"),

      imageAlt: "Vintage motel sign on a tall pole against a blue sky",
      startDateTime: "2026-12-19T18:00:00.000Z",
      endDateTime: "2026-12-19T21:00:00.000Z",
      price: 25,
      maxPeople: 120,
      paymentOutcome: "success",
    },
  ];
}
