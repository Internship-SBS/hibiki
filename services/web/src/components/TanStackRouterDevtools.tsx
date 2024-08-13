import { lazy } from "react";

export const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // productionでは何も表示しない
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          // Lazy load in development
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );
