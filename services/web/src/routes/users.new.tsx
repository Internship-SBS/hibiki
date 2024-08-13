import {
  AppShell,
  Button,
  Divider,
  Group,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { IconCancel, IconUserPlus } from "@tabler/icons-react";
import { trpc } from "../utils/trpc";

export const Route = createFileRoute("/users/new")({
  component: Page,
});

function Page() {
  const router = useRouter();
  const utils = trpc.useUtils();
  const userCreator = trpc.users.createUser.useMutation({
    onSuccess: (data) => {
      utils.users.getUsers.invalidate();
      router.navigate({ to: `/users/${data.id}` });
    },
    onError: (error) => {
      const errorData = JSON.parse(error.message);
      alert(errorData.map((err: any) => err.message));
    },
  });
  const form = useForm({
    defaultValues: {
      name: "",
      bio: "",
    },
    onSubmit: (values) => {
      userCreator.mutate({
        name: values.value.name,
        bio: values.value.bio,
      });
    },
    validatorAdapter: zodValidator(),
  });
  return (
    <>
      <AppShell.Aside p="md">
        <Title order={2} fw="normal">
          Create new user
        </Title>
        <Divider my="md" />
        <Stack
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
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
          <Group justify="flex-end">
            <Button
              type="button"
              variant="secondary"
              leftSection={<IconCancel />}
              onClick={() => {
                router.navigate({ to: "/" });
              }}
            >
              Cancel
            </Button>
            <Button type="submit" leftSection={<IconUserPlus />}>
              Create
            </Button>
          </Group>
        </Stack>
      </AppShell.Aside>
    </>
  );
}
