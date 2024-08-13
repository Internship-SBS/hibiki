import { NavLink } from "@mantine/core";
import { IconCategory, IconHome } from "@tabler/icons-react";
import { Link, useLocation } from "@tanstack/react-router";

export function Navbar() {
  const location = useLocation();
  return (
    <>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <NavLink
          variant="light"
          label="Home"
          leftSection={<IconHome />}
          active={
            location.pathname === "/" || location.pathname.includes("users")
          }
        />
      </Link>
      <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
        <NavLink
          variant="light"
          label="About"
          leftSection={<IconCategory />}
          active={location.pathname === "/about"}
        />
      </Link>
    </>
  );
}
