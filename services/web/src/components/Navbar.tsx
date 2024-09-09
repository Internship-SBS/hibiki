import {
  Box,
  Button,
  Flex,
  Grid,
  Group,
  Paper,
  Pill,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { trpc } from "../utils/trpc";
import { CheckinButton } from "./CheckinButton";
import { CheckoutButton } from "./CheckoutButton";
import { GoOutButton } from "./GoOutButton";
import { CommentEditor } from "./CommentEditor";
import { IconClock, IconRun } from "@tabler/icons-react";

export function Navbar() {
  const { data: loginUser, isPending } = trpc.users.getLoginUser.useQuery();
  if (isPending || !loginUser) return <PendingCard />;
  return (
    <Box p="sm">
      <Paper shadow="sm" p="sm">
        <Stack gap="xs">
          <Group>
            <Pill
              size="sm"
              bg={loginUser?.UserStatus.Status.bgColor}
              c={loginUser?.UserStatus.Status.textColor}
            >
              {loginUser?.UserStatus.Status.name}
            </Pill>
            <Text size="lg" fw="bolder">
              {loginUser.name}
            </Text>
          </Group>
          {loginUser.UserStatus.Status.name === "外出" && (
            <Group gap="4 12">
              <Flex gap="xs">
                <ThemeIcon variant="secondary" size="sm">
                  <IconRun />
                </ThemeIcon>
                <Text>{loginUser.UserStatus.description}</Text>
              </Flex>
              {loginUser.UserStatus.endTime && (
                <Flex gap={4}>
                  <ThemeIcon variant="secondary" size="sm">
                    <IconClock />
                  </ThemeIcon>
                  <Text>{loginUser.UserStatus.endTime} まで</Text>
                </Flex>
              )}
              {loginUser.UserStatus.goDirectly && (
                <Pill bg="red" c="white">
                  直行
                </Pill>
              )}
              {loginUser.UserStatus.returnDirectly && (
                <Pill bg="indigo" c="white">
                  直帰
                </Pill>
              )}
            </Group>
          )}
          <Grid gutter="xs">
            <Grid.Col span="auto">
              <CheckinButton
                loginUserId={loginUser.id}
                active={loginUser.UserStatus.Status.name === "出勤"}
              />
            </Grid.Col>
            <Grid.Col span="auto">
              <CheckoutButton
                loginUserId={loginUser.id}
                active={loginUser.UserStatus.Status.name === "退勤"}
              />
            </Grid.Col>
            <Grid.Col span="auto">
              <GoOutButton
                loginUserId={loginUser.id}
                active={loginUser.UserStatus.Status.name === "外出"}
              />
            </Grid.Col>
          </Grid>
          <CommentEditor loginUser={loginUser} />
        </Stack>
      </Paper>
    </Box>
  );
}

function PendingCard() {
  return (
    <Box p="sm">
      <Paper shadow="sm" p="sm">
        <Stack gap="xs">
          <Skeleton>
            <Text size="lg">読み込み中</Text>
          </Skeleton>
          <Grid gutter="xs">
            <Grid.Col span="auto">
              <Skeleton>
                <Button fullWidth />
              </Skeleton>
            </Grid.Col>
            <Grid.Col span="auto">
              <Skeleton>
                <Button fullWidth />
              </Skeleton>
            </Grid.Col>
            <Grid.Col span="auto">
              <Skeleton>
                <Button fullWidth />
              </Skeleton>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>
    </Box>
  );
}
