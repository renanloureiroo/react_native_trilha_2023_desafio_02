import { colors } from "./colors";
import { typography } from "./typography";
import { spacing } from "./spacing";
import { timing } from "./timing";

export * from "./typography";

export const theme = {
  colors,
  typography,
  spacing,
  timing,
};

export type Theme = typeof theme;
