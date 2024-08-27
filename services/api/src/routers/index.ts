import { router } from "../trpc";
import { divisionRouter } from "./divisions";
import { userRouter } from "./users";
import { userStatusRouter } from "./userStatus";

export const appRouter = router({
  users: userRouter,
  divisions: divisionRouter,
  userStatus: userStatusRouter,
});

export type AppRouter = typeof appRouter;
