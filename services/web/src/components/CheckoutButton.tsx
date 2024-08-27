import { Button } from "@mantine/core";
import { trpc } from "../utils/trpc";

type Props = {
  loginUserId: string;
  active?: boolean;
};

export function CheckoutButton(props: Props) {
  const { loginUserId, active = false } = props;

  const utils = trpc.useUtils();
  const checkoutCreator = trpc.userStatus.checkout.useMutation({
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
        checkoutCreator.mutate(loginUserId);
      }}
    >
      退勤
    </Button>
  );
}
