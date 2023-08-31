import { colors } from "./colors";
import { typography } from "./typography";
import { spacing } from "./spacing";

export * from "./typography";

export const theme = {
  colors,
  typography,
  spacing,
};

export type Theme = typeof theme;
