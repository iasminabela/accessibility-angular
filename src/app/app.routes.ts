import { Routes } from "@angular/router";
import { LayoutComponent } from "./components/layout/layout.component";
import { authGuard, adminGuard } from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () =>
      import("./pages/login-page.component").then((m) => m.LoginPageComponent),
  },
  {
    path: "register",
    loadComponent: () =>
      import("./pages/register-page.component").then(
        (m) => m.RegisterPageComponent,
      ),
  },
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "dashboard" },
      {
        path: "dashboard",
        canActivate: [authGuard],
        loadComponent: () =>
          import("./pages/dashboard-page.component").then(
            (m) => m.DashboardPageComponent,
          ),
      },
      {
        path: "events",
        canActivate: [authGuard],
        loadComponent: () =>
          import("./pages/events-page.component").then(
            (m) => m.EventsPageComponent,
          ),
      },
      {
        path: "events/:eventId",
        canActivate: [authGuard],
        loadComponent: () =>
          import("./pages/event-detail-page.component").then(
            (m) => m.EventDetailPageComponent,
          ),
      },
      {
        path: "admin/users",
        canActivate: [authGuard, adminGuard],
        loadComponent: () =>
          import("./pages/admin-users-page.component").then(
            (m) => m.AdminUsersPageComponent,
          ),
      },
      {
        path: "admin/events",
        canActivate: [authGuard, adminGuard],
        loadComponent: () =>
          import("./pages/admin-events-page.component").then(
            (m) => m.AdminEventsPageComponent,
          ),
      },
      {
        path: "**",
        loadComponent: () =>
          import("./pages/not-found-page.component").then(
            (m) => m.NotFoundPageComponent,
          ),
      },
    ],
  },
];
