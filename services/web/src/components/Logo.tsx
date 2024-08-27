import { Group, Text } from "@mantine/core";

export function Logo() {
  return (
    <Group gap={4}>
      <Text
        component="span"
        variant="gradient"
        gradient={{ from: "cyan", to: "indigo" }}
        fw="bolder"
        size="32px"
      >
        Whiteboard
      </Text>
    </Group>
  );
}
