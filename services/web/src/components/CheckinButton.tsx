import { Button } from "@mantine/core";
import { trpc } from "../utils/trpc";

type Props = {
  loginUserId: string;
  active?: boolean;
};

export function CheckinButton(props: Props) {
  const { loginUserId, active = false } = props;
  const utils = trpc.useUtils();
  const checkinCreator = trpc.userStatus.checkin.useMutation({
    onSuccess: () => {
      utils.users.getUsersByDivision.invalidate();
      utils.users.getLoginUser.invalidate();
    },
    onError: (error) => {
      const errorData = JSON.parse(error.message);
      alert(errorData.map((err: any) => err.message));
    },
  });
  return (
    <Button
      variant={active ? "primary" : "secondary"}
      fullWidth
      onClick={() => {
        checkinCreator.mutate(loginUserId);
      }}
    >
      出勤
    </Button>
  );
}
