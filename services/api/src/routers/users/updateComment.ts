import { prisma } from "../../../prisma/client";
import { UserUpdateCommentSchema } from "../../schemas";
import { publicProcedure } from "../../trpc";

export const updateComment = publicProcedure
  .input(UserUpdateCommentSchema)
  .mutation(async ({ input }) => {
    return await prisma.user.update({
      where: {
        id: input.id,
      },
      data: {
        comment: input.comment,
      },
    });
  });
