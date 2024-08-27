import { router } from "../../trpc";
import { getDivisions } from "./getDivisions";

export const divisionRouter = router({ getDivisions });
