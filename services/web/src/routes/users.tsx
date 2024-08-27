import { createFileRoute, Outlet } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { AppShell, Box, Space, Tabs } from "@mantine/core";
import { getQueryKey } from "@trpc/react-query";
import { trpc, trpcClient } from "../utils/trpc";
import { DivisionTabPanelContent } from "../components/DivisionTabPanelContent";
import { queryClient } from "../utils/queryClient";

const loginUserQueryOptions = queryOptions({
  queryKey: getQueryKey(trpc.users.getLoginUser),
  queryFn: () => trpcClient.users.getLoginUser.query(),
});

const divisionsQueryOptions = queryOptions({
  queryKey: getQueryKey(trpc.divisions.getDivisions),
  queryFn: () => trpcClient.divisions.getDivisions.query(),
});

export const Route = createFileRoute("/users")({
  loader: async () =>
    await Promise.all([
      queryClient.ensureQueryData(divisionsQueryOptions),
      queryClient.ensureQueryData(loginUserQueryOptions),
    ]),
  component: Page,
});

function Page() {
  const divisionsData = useSuspenseQuery(divisionsQueryOptions);
  const divisions = divisionsData.data;
  const loginUserData = useSuspenseQuery(loginUserQueryOptions);
  const loginUserDivision = loginUserData.data?.Divisions[0];

  return (
    <>
      <AppShell.Main>
        <Box>
          <Tabs
            defaultValue={loginUserDivision?.id ?? divisions[0].id}
            keepMounted={false}
          >
            <Tabs.List>
              {divisions.map((division) => (
                <Tabs.Tab key={division.id} value={division.id}>
                  {division.name}
                </Tabs.Tab>
              ))}
            </Tabs.List>
            {divisions.map((division) => (
              <Tabs.Panel key={division.id} value={division.id}>
                <Space h={16} />
                <DivisionTabPanelContent division={division} />
              </Tabs.Panel>
            ))}
          </Tabs>
        </Box>
      </AppShell.Main>
      <Outlet />
    </>
  );
}
