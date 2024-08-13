import { createFileRoute } from "@tanstack/react-router";
import { usersRouteOption } from "./users";

export const Route = createFileRoute("/")({ ...usersRouteOption });
