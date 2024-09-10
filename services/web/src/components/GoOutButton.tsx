import {
  Button,
  Chip,
  Divider,
  Group,
  InputError,
  Popover,
  Stack,
  TextInput,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";

import { trpc } from "../utils/trpc";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useState } from "react";

type Props = {
  loginUserId: string;
  active?: boolean;
};

export function GoOutButton(props: Props) {
  const { loginUserId, active = false } = props;
  const utils = trpc.useUtils();
  const [opened, setOpened] = useState(false);
  const open = () => {
    setOpened(true);
  };
  const close = () => {
    setOpened(false);
  };
  const goOutCreator = trpc.userStatus.goOut.useMutation({
    onSuccess: () => {
      utils.users.getUsersByDivision.invalidate();
      utils.users.getLoginUser.invalidate();
    },
    onError: (error) => {
      const errorData = JSON.parse(error.message);
      alert(errorData.map((err: Error) => err.message));
    },
  });
  const form = useForm({
    defaultValues: {
      description: "",
      goDirectly: false,
      returnDirectly: false,
      endTime: "",
    },
    onSubmit: (values) => {
      goOutCreator.mutate({
        userId: loginUserId,
        description: values.value.description,
        goDirectly: values.value.goDirectly,
        returnDirectly: values.value.returnDirectly,
        endTime: values.value.returnDirectly ? "" : values.value.endTime,
      });
      close();
    },
    validatorAdapter: zodValidator(),
  });
  return (
    <Popover withArrow opened={opened} onChange={setOpened}>
      <Popover.Target>
        <Button
          variant={active ? "primary" : "secondary"}
          onClick={open}
          fullWidth
        >
          外出
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="description"
            validators={{
              onChange: z
                .string()
                .min(1, { message: "行き先を入力してください" }),
            }}
            children={(field) => (
              <TextInput
                label="行き先"
                autoFocus
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                error={field.state.meta.errors.join(",")}
              />
            )}
          />
          <Stack gap={8}>
            <form.Subscribe
              selector={(state) => [state.values.returnDirectly]}
              children={([returnDirectly]) => (
                <form.Field
                  name="endTime"
                  validators={{
                    onChangeListenTo: ["returnDirectly"],
                    onChange: ({ value, fieldApi }) =>
                      !fieldApi.form.getFieldValue("returnDirectly") &&
                      value.length === 0
                        ? "帰社予定時刻を入力してください"
                        : undefined,
                  }}
                  children={(field) => (
                    <TimeInput
                      label="帰社予定"
                      disabled={returnDirectly}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      error={field.state.meta.errors.join(",")}
                    />
                  )}
                />
              )}
            />
            <Group justify="flex-end" gap="xs">
              <form.Field
                name="goDirectly"
                validators={{
                  onChange: z.boolean(),
                }}
                children={(field) => (
                  <>
                    <Chip
                      color="red"
                      name={field.name}
                      checked={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(value) => field.handleChange(value)}
                    >
                      直行
                    </Chip>
                    <InputError>{field.state.meta.errors.join(",")}</InputError>
                  </>
                )}
              />
              <form.Field
                name="returnDirectly"
                validators={{
                  onChange: z.boolean(),
                }}
                children={(field) => (
                  <>
                    <Chip
                      color="indigo"
                      name={field.name}
                      checked={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(value) => field.handleChange(value)}
                    >
                      直帰
                    </Chip>
                    <InputError>{field.state.meta.errors.join(",")}</InputError>
                  </>
                )}
              />
            </Group>
          </Stack>
          <Divider />
          <Group justify="flex-end">
            <Button type="button" variant="secondary" onClick={close}>
              キャンセル
            </Button>
            <Button type="submit">OK</Button>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
