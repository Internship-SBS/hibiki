import z from "zod";
import { User } from "@prisma/client";
import { SchemaOf } from "./util/SchemaOf";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  bio: z.string().nullable(),
} satisfies SchemaOf<User>);
export const UserCreateSchema = UserSchema.omit({ id: true });
export const UserUpdateSchema = UserSchema;
