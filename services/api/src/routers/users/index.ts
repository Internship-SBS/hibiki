import { router } from "../../trpc";
import { createUser } from "./createUser";
import { deleteUser } from "./deleteUser";
import { getUserById } from "./getUserById";
import { getUsers } from "./getUsers";
import { updateUser } from "./updateUser";

export const userRouter = router({
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
});
