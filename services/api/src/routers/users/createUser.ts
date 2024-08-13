import { prisma } from "../../../prisma/client";
import { UserCreateSchema } from "../../schemas";
import { publicProcedure } from "../../trpc";

export const createUser = publicProcedure
  .input(UserCreateSchema)
  .mutation(async ({ input }) => {
    return await prisma.user.create({
      data: input,
    });
  });
