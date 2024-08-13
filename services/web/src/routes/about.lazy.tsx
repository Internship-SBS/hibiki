import { AppShell } from "@mantine/core";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <>
      <AppShell.Main>
        About
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "rgb(130,201,0)", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "rgb(18,184,134)", stopOpacity: 1 }}
              />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "rgb(21,170,191)", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "rgb(76,110,245)", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <text
            x="50%"
            y="50%"
            dominant-baseline="middle"
            text-anchor="middle"
            fontSize={735}
            fontFamily="Helvetica"
            fill="black"
            opacity={0.05}
          >
            x
          </text>

          <text
            x="50%"
            y="16%"
            dominant-baseline="middle"
            text-anchor="middle"
            fontSize={110}
            fontFamily="Helvetica"
            transform="scale(1, 2)"
            fill="url(#grad1)"
            fontWeight={700}
          >
            TanStack
          </text>
          <text
            x="50%"
            y="38%"
            dominant-baseline="middle"
            text-anchor="middle"
            fontSize={110}
            fontFamily="Helvetica"
            transform="scale(1, 2)"
            fill="url(#grad2)"
            fontWeight={700}
          >
            tRPC
          </text>
        </svg>
      </AppShell.Main>
    </>
  );
}
