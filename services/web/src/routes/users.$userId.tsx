import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { trpc, trpcClient } from "../utils/trpc";
import { queryClient } from "./__root";
import {
  ActionIcon,
  AppShell,
  CloseButton,
  Group,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { getQueryKey } from "@trpc/react-query";
import {
  IconCancel,
  IconCheck,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-form-adapter";

const getUserQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: [...getQueryKey(trpc.users.getUserById), userId],
    queryFn: () => trpcClient.users.getUserById.query(userId),
  });

export const Route = createFileRoute("/users/$userId")({
  component: Page,
  loader: ({ params: { userId } }) =>
    queryClient.ensureQueryData(getUserQueryOptions(userId)),
});

function Page() {
  const { userId } = Route.useParams();
  const router = useRouter();
  const utils = trpc.useUtils();
  const userData = useSuspenseQuery(getUserQueryOptions(userId));
  const user = userData.data;
  const userDeleter = trpc.users.deleteUser.useMutation({
    onSuccess: () => {
      router.navigate({ to: "/users" });
      utils.users.getUsers.invalidate();
    },
  });
  const userUpdater = trpc.users.updateUser.useMutation({
    onSuccess: () => {
      utils.users.getUsers.invalidate();
      utils.invalidate(undefined, { queryKey: [userId] });
      close();
    },
    onError: (error) => {
      const errorData = JSON.parse(error.message);
      alert(errorData.map((err: any) => err.message));
    },
  });
  const [editing, { open, close }] = useDisclosure(false);
  const form = useForm({
    defaultValues: {
      name: user?.name ?? "",
      bio: user?.bio ?? "",
    },
    onSubmit: (values) => {
      userUpdater.mutate({
        id: userId,
        name: values.value.name,
        bio: values.value.bio,
      });
    },
    validatorAdapter: zodValidator(),
  });
  if (!user) {
    redirect({ to: "/users" });
    return null;
  }
  return (
    <>
      <AppShell.Aside p="md">
        <Stack
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {editing ? (
            <Stack gap={4}>
              <form.Field
                name="name"
                validators={{
                  onChange: z
                    .string()
                    .min(3, "Name must be at least 3 characters"),
                }}
                children={(field) => (
                  <TextInput
                    label="name"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    error={field.state.meta.errors.join(",")}
                  />
                )}
              />
              <form.Field
                name="bio"
                children={(field) => (
                  <Textarea
                    label="bio"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                  />
                )}
              />
            </Stack>
          ) : (
            <Stack gap={4}>
              <Group justify="space-between">
                <Title fw="normal">{user.name}</Title>
                <CloseButton
                  onClick={() => {
                    router.navigate({ to: "/" });
                  }}
                />
              </Group>
              <Text style={{ whiteSpace: "pre-wrap" }}>{user.bio}</Text>
            </Stack>
          )}
          <Group>
            {editing ? (
              <>
                <Tooltip label="Done">
                  <ActionIcon variant="tertiary" type="submit">
                    <IconCheck />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Cancel">
                  <ActionIcon variant="tertiary" onClick={close}>
                    <IconCancel />
                  </ActionIcon>
                </Tooltip>
              </>
            ) : (
              <Tooltip label="Edit">
                <ActionIcon variant="tertiary" onClick={open}>
                  <IconEdit />
                </ActionIcon>
              </Tooltip>
            )}
            <Tooltip label="Delete">
              <ActionIcon
                variant="danger-outline"
                onClick={() => {
                  userDeleter.mutate(userId);
                }}
              >
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Stack>
      </AppShell.Aside>
    </>
  );
}
