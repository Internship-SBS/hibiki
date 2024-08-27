import { prisma } from "../../../prisma/client";
import { publicProcedure } from "../../trpc";

export const getDivisions = publicProcedure.query(async () => {
  return await prisma.division.findMany();
});
