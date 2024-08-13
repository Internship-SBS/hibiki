import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import cors from "@fastify/cors";
import { appRouter, type AppRouter } from "./routers";
import { createContext } from "./context";

const server = fastify({
  maxParamLength: 5000,
  logger: true,
});

server.register(cors, {
  origin: "http://127.0.0.1:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      console.error(`Error in tRPC handler on path '${path}':`, error);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
});

(async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
