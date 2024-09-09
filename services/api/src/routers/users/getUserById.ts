import z from "zod";
import { prisma } from "../../../prisma/client";
import { publicProcedure } from "../../trpc";
import { DivisionSchema, UserSchema } from "../../schemas";
import { TRPCError } from "@trpc/server";

export const getUserById = publicProcedure
  .input(z.string())
  .output(
    UserSchema.extend({
      Divisions: z.array(DivisionSchema),
    })
  )
  .query(async ({ input }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: input,
      },
      include: {
        Divisions: true,
      },
    });
    if (!user) throw new TRPCError({ code: "NOT_FOUND" });
    return user;
  });
