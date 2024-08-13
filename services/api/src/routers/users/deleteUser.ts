import z from "zod";
import { prisma } from "../../../prisma/client";
import { publicProcedure } from "../../trpc";

export const deleteUser = publicProcedure
  .input(z.string())
  .mutation(async ({ input }) => {
    return await prisma.user.delete({
      where: {
        id: input,
      },
    });
  });
