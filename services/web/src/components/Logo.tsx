import { Group, Text } from "@mantine/core";

export function Logo() {
  return (
    <Group gap={4}>
      <Text
        component="span"
        variant="gradient"
        gradient={{ from: "lime", to: "teal" }}
        fw="bolder"
        size="32px"
      >
        TanStack
      </Text>
      <Text component="span" fw="bolder" c="dimmed" size="32px">
        ×
      </Text>
      <Text
        component="span"
        variant="gradient"
        gradient={{ from: "cyan", to: "indigo" }}
        fw="bolder"
        size="32px"
      >
        tRPC
      </Text>
    </Group>
  );
}
