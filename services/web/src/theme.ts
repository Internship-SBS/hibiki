import { createTheme, defaultVariantColorsResolver } from "@mantine/core";

export const theme = createTheme({
  /* Put your mantine theme override here */
  variantColorResolver: (input) => {
    const defaultResolvedColors = defaultVariantColorsResolver(input);
    const outlineStyle = defaultVariantColorsResolver({
      ...input,
      variant: "outline",
    });
    const transparentStyle = defaultVariantColorsResolver({
      ...input,
      variant: "transparent",
    });

    if (input.variant === "secondary") {
      return outlineStyle;
    }
    if (input.variant === "tertiary") {
      return transparentStyle;
    }
    if (input.variant === "danger") {
      return {
        background: "var(--mantine-color-red-filled)",
        hover: "var(--mantine-color-red-filled-hover)",
        color: "var(--mantine-color-white)",
        border: "none",
      };
    }
    if (input.variant === "success") {
      return {
        background: "var(--mantine-color-teal-filled)",
        hover: "var(--mantine-color-teal-filled-hover)",
        color: "var(--mantine-color-white)",
        border: "none",
      };
    }
    if (input.variant === "warning") {
      return {
        background: "var(--mantine-color-yellow-filled)",
        hover: "var(--mantine-color-yellow-filled-hover)",
        color: "var(--mantine-color-white)",
        border: "none",
      };
    }
    if (input.variant === "danger-outline") {
      return {
        background: "transparent",
        hover: "var(--mantine-color-red-outline-hover)",
        color: "var(--mantine-color-red-outline)",
        border: "var(--mantine-color-red-outline)",
      };
    }
    if (input.variant === "success-outline") {
      return {
        background: "transparent",
        hover: "var(--mantine-color-teal-outline-hover)",
        color: "var(--mantine-color-teal-outline)",
        border: "var(--mantine-color-teal-outline)",
      };
    }
    if (input.variant === "warning-outline") {
      return {
        background: "transparent",
        hover: "var(--mantine-color-yellow-outline-hover)",
        color: "var(--mantine-color-yellow-outline)",
        border: "var(--mantine-color-yellow-outline)",
      };
    }
    if (input.variant === "star") {
      return {
        background: "transparent",
        hover: "var(--mantine-color-yellow-outline-hover)",
        color: "var(--mantine-color-yellow-outline)",
        border: "none",
      };
    }
    if (input.variant === "simple") {
      return {
        background: "transparent",
        hover: "var(--mantine-color-default-hover)",
        color: "var(--mantine-color-text)",
        border: "none",
      };
    }
    if (input.variant === "info") {
      return {
        background: "transparent",
        hover: "var(--mantine-color-gray-hover)",
        color: "var(--mantine-color-gray-outline)",
        border: "var(--mantine-color-gray-outline)",
      };
    }

    return defaultResolvedColors;
  },
});
