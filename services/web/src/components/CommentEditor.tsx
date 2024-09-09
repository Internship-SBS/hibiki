import { User } from "@app/api/prisma/client";
import {
  Alert,
  Button,
  Group,
  InputLabel,
  Stack,
  Textarea,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@tanstack/react-form";
import { useDisclosure } from "@mantine/hooks";
import { trpc } from "../utils/trpc";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-form-adapter";

type Props = {
  loginUser: User;
};

export function CommentEditor(props: Props) {
  const { loginUser } = props;
  const [editing, { open: edit, close: done }] = useDisclosure(false);
  const utils = trpc.useUtils();
  const commentUpdater = trpc.users.updateComment.useMutation({
    onSuccess: () => {
      utils.users.getUsersByDivision.invalidate();
      utils.invalidate(undefined, { queryKey: [loginUser.id] });
      done();
    },
  });
  const form = useForm({
    defaultValues: {
      comment: loginUser.comment ?? "",
    },
    onSubmit: (values) => {
      commentUpdater.mutate({
        id: loginUser.id,
        comment: values.value.comment,
      });
    },
    validatorAdapter: zodValidator(),
  });
  const handleClickCancel = () => {
    form.reset();
    done();
  };
  return (
    <Stack gap={4}>
      {editing ? (
        <Stack
          gap={4}
          component="form"
          hidden={!editing}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="comment"
            validators={{
              onChange: z.string(),
            }}
            children={(field) => (
              <Textarea
                id="comment"
                label="コメント"
                autosize
                minRows={4}
                maxRows={8}
                autoFocus
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
          <Group justify="space-between">
            <Button
              type="button"
              onClick={handleClickCancel}
              variant="tertiary"
            >
              キャンセル
            </Button>
            <Button type="submit">保存</Button>
          </Group>
        </Stack>
      ) : (
        <UnstyledButton onClick={edit}>
          <InputLabel>コメント</InputLabel>
          <Alert mih={101} color="gray" p="xs">
            {loginUser.comment}
          </Alert>
        </UnstyledButton>
      )}
    </Stack>
  );
}
