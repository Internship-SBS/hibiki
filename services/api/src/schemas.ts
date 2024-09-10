import z from "zod";
import { Division, Status, User, UserStatus } from "@prisma/client";
import { SchemaOf } from "./util/SchemaOf";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email(),
  comment: z.string().nullable(),
  extension: z.string().nullable(),
  updatedAt: z.coerce.date()
} satisfies SchemaOf<User>);
export const UserCreateSchema = UserSchema.omit({ id: true });
export const UserUpdateSchema = UserSchema;
export const UserUpdateCommentSchema = UserSchema.omit({
  name: true,
  email: true,
  extension: true,
  updatedAt: true,
});

export const DivisionSchema = z.object({
  id: z.string(),
  name: z.string(),
} satisfies SchemaOf<Division>);

export const UserStatusSchema = z.object({
  id: z.string(),
  description: z.string().nullable(),
  goDirectly: z.boolean().nullable(),
  returnDirectly: z.boolean().nullable(),
  endTime: z.string().nullable(),
  userId: z.string(),
  statusId: z.string(),
  createdAt: z.coerce.date(),
} satisfies SchemaOf<UserStatus>);
export const UserStatusCreateSchema = UserStatusSchema.omit({
  id: true,
  createdAt: true,
  statusId: true,
});

export const StatusSchema = z.object({
  id: z.string(),
  name: z.string(),
  bgColor: z.string(),
  textColor: z.string(),
} satisfies SchemaOf<Status>);
