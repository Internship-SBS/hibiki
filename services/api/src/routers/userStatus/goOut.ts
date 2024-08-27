import { z } from "zod";
import { prisma } from "../../../prisma/client";
import { publicProcedure } from "../../trpc";
import { UserStatusCreateSchema } from "../../schemas";

export const goOut = publicProcedure
  .input(UserStatusCreateSchema)
  .mutation(async ({ input }) => {
    return await prisma.userStatus.create({
      data: {
        description: input.description,
        goDirectly: input.goDirectly,
        returnDirectly: input.returnDirectly,
        endTime: input.endTime,
        User: {
          connect: {
            id: input.userId,
          },
        },
        Status: {
          connect: {
            name: "外出",
          },
        },
      },
    });
  });
