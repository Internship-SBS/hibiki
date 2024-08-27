import { z } from "zod";
import { prisma } from "../../../prisma/client";
import { publicProcedure } from "../../trpc";
import { StatusSchema, UserSchema, UserStatusSchema } from "../../schemas";

export const getUsersByDivision = publicProcedure
  .input(z.string())
  .output(
    z.array(
      UserSchema.extend({
        UserStatus: UserStatusSchema.extend({
          Status: StatusSchema,
        }),
      })
    )
  )
  .query(async ({ input }) => {
    const users = await prisma.user.findMany({
      where: {
        Divisions: {
          some: {
            id: input,
          },
        },
      },
      include: {
        UserStatus: {
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            Status: true,
          },
        },
      },
    });
    return users.map((user) => ({
      ...user,
      UserStatus: user.UserStatus[0],
    }));
  });
