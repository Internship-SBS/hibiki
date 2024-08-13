import { prisma } from "../../../prisma/client";
import { publicProcedure } from "../../trpc";

export const getUsers = publicProcedure.query(async () => {
  return await prisma.user.findMany();
});
