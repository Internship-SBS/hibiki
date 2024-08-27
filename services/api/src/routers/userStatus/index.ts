import { router } from "../../trpc";
import { checkin } from "./checkin";
import { checkout } from "./checkout";
import { goOut } from "./goOut";

export const userStatusRouter = router({ checkin, checkout, goOut });
