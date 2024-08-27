import {
  Paper,
  Stack,
  Title,
  Text,
  Group,
  Pill,
  Alert,
  Modal,
  UnstyledButton,
  ThemeIcon,
  Flex,
} from "@mantine/core";
import { Status, User, UserStatus } from "../../../api/prisma/client";
import { useDisclosure } from "@mantine/hooks";
import { IconClock, IconPhone, IconRun } from "@tabler/icons-react";

type Props = {
  user: User & {
    UserStatus: UserStatus & {
      Status: Status;
    };
  };
};

export function UserCard(props: Props) {
  const { user } = props;
  const { name, comment } = user;
  const [isOpen, { open, close }] = useDisclosure();
  return (
    <>
      <Paper
        w={{
          base: 250,
        }}
        shadow="md"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <UnstyledButton onClick={open}>
          <Stack gap="xs" px="sm" py="xs" flex="1 1 0">
            <Stack gap={4}>
              <Group gap="xs">
                <Pill
                  size="sm"
                  bg={user.UserStatus.Status.bgColor}
                  c={user.UserStatus.Status.textColor}
                >
                  {user.UserStatus.Status.name}
                </Pill>
                <Title order={2} c="dark" size={20}>
                  {name}
                </Title>
              </Group>
              {user.UserStatus.Status.name === "外出" && (
                <Group gap="4 12">
                  <Flex gap="xs">
                    <ThemeIcon variant="secondary" size="sm">
                      <IconRun />
                    </ThemeIcon>
                    <Text>{user.UserStatus.description}</Text>
                  </Flex>
                  {user.UserStatus.endTime && (
                    <Flex gap={4}>
                      <ThemeIcon variant="secondary" size="sm">
                        <IconClock />
                      </ThemeIcon>
                      <Text>{user.UserStatus.endTime} まで</Text>
                    </Flex>
                  )}
                  {user.UserStatus.goDirectly && (
                    <Pill bg="red" c="white">
                      直行
                    </Pill>
                  )}
                  {user.UserStatus.returnDirectly && (
                    <Pill bg="indigo" c="white">
                      直帰
                    </Pill>
                  )}
                </Group>
              )}

              <Group gap={4}>
                <ThemeIcon variant="tertiary" size="xs">
                  <IconPhone />
                </ThemeIcon>
                <Text size="sm">{user.extension}</Text>
              </Group>
            </Stack>
            <Alert color="gray" px="xs" py={8} mih={66}>
              <Text c="dark">{comment}</Text>
            </Alert>
          </Stack>
        </UnstyledButton>
      </Paper>

      <Modal
        opened={isOpen}
        onClose={close}
        size="lg"
        title={
          <Group gap="xs">
            <Pill
              size="sm"
              bg={user.UserStatus.Status.bgColor}
              c={user.UserStatus.Status.textColor}
            >
              {user.UserStatus.Status.name}
            </Pill>
            <Title order={2} c="dark" size={20}>
              {name}
            </Title>
          </Group>
        }
      >
        a
      </Modal>
    </>
  );
}
