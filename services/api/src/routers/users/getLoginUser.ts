import { TRPCError } from "@trpc/server";
import { prisma } from "../../../prisma/client";
import { publicProcedure } from "../../trpc";
import {
  DivisionSchema,
  StatusSchema,
  UserSchema,
  UserStatusSchema,
} from "../../schemas";
import { z } from "zod";

export const getLoginUser = publicProcedure
  .output(
    UserSchema.extend({
      Divisions: z.array(DivisionSchema),
      UserStatus: UserStatusSchema.extend({
        Status: StatusSchema,
      }),
    })
  )
  .query(async () => {
    const user = await prisma.user.findUnique({
      where: {
        id: "testLoginUserId59234619",
      },
      include: {
        Divisions: true,
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
    if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });
    return { ...user, UserStatus: user.UserStatus[0] };
  });
