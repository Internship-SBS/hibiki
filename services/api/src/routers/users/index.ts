import { router } from "../../trpc";
import { createUser } from "./createUser";
import { deleteUser } from "./deleteUser";
import { getLoginUser } from "./getLoginUser";
import { getUserById } from "./getUserById";
import { getUsers } from "./getUsers";
import { getUsersByDivision } from "./getUsersByDivision";
import { updateComment } from "./updateComment";
import { updateUser } from "./updateUser";

export const userRouter = router({
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getLoginUser,
  getUsersByDivision,
  updateComment,
});
