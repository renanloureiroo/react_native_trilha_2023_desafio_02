import "styled-components/native";

import { Theme } from "../shared/theme";

declare module "styled-components/native" {
  export interface DefaultTheme extends Theme {}
}
