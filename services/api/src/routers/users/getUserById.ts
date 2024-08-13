import z from "zod";
import { prisma } from "../../../prisma/client";
import { publicProcedure } from "../../trpc";

export const getUserById = publicProcedure
  .input(z.string())
  .query(async ({ input }) => {
    return await prisma.user.findUnique({
      where: {
        id: input,
      },
    });
  });
