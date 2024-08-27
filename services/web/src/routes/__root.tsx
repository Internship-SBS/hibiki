import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { Suspense, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { AppShell, Burger, Group, MantineProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { theme } from "../theme";
import { trpc, trpcClientOptions } from "../utils/trpc";
import { Logo } from "../components/Logo";
import { Navbar } from "../components/Navbar";
import { TanStackRouterDevtools } from "../components/TanStackRouterDevtools";
import { ModalsProvider } from "@mantine/modals";
import { queryClient } from "../utils/queryClient";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const [trpcClient] = useState(() => trpc.createClient(trpcClientOptions));
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <ModalsProvider>
            <AppShell
              header={{ height: 60 }}
              navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
              }}
              padding="md"
            >
              <AppShell.Header>
                <Group h="100%" px="md">
                  <Burger
                    opened={mobileOpened}
                    onClick={toggleMobile}
                    hiddenFrom="sm"
                    size="sm"
                  />
                  <Burger
                    opened={desktopOpened}
                    onClick={toggleDesktop}
                    visibleFrom="sm"
                    size="sm"
                  />
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Logo />
                  </Link>
                </Group>
              </AppShell.Header>
              <AppShell.Navbar>
                <Navbar />
                <Suspense>
                  <TanStackRouterDevtools />
                </Suspense>
              </AppShell.Navbar>
              <Outlet />
            </AppShell>
          </ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
