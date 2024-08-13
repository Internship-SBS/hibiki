import {
  createTRPCClient,
  createTRPCReact,
  httpBatchLink,
} from "@trpc/react-query";
import type { AppRouter } from "@app/api/src/routers";
import superjson from "superjson";

export const trpcClientOptions = {
  links: [
    httpBatchLink({
      url: "http://127.0.0.1:3000/trpc",
      transformer: superjson,
      fetch(url, options) {
        return fetch(url, { ...options, credentials: "include" });
      },
      async headers() {
        return {
          // authorization: getAuthCookie(),
        };
      },
    }),
  ],
};
export const trpc = createTRPCReact<AppRouter>();
export const trpcClient = createTRPCClient<AppRouter>(trpcClientOptions);
