import { prisma } from "../../../prisma/client";
import { UserUpdateSchema } from "../../schemas";
import { publicProcedure } from "../../trpc";

export const updateUser = publicProcedure
  .input(UserUpdateSchema)
  .mutation(async ({ input }) => {
    return await prisma.user.update({
      where: {
        id: input.id,
      },
      data: input,
    });
  });
