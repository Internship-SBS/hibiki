import { Division } from "@app/api/prisma/client";
import { trpc } from "../utils/trpc";
import { Group, Skeleton, Text } from "@mantine/core";
import { UserCard } from "./UserCard";

type Props = {
  division: Division;
};

export function DivisionTabPanelContent(props: Props) {
  const { division } = props;
  const usersData = trpc.users.getUsersByDivision.useQuery(division.id);
  if (usersData.isPending)
    return (
      <>
        <Group align="stretch">
          <Skeleton w={250} h={100} />
          <Skeleton w={250} h={100} />
        </Group>
      </>
    );
  if (usersData.data?.length === 0) return <Text>ユーザーはいません</Text>;
  return (
    <>
      <Group align="stretch">
        {usersData.data?.map((user) => <UserCard key={user.id} user={user} />)}
      </Group>
    </>
  );
}
