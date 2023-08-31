import { FC } from "react";
import { ViewProps, ViewStyle } from "react-native";
import * as Styled from "./styles";

import type { ContainerProps } from "./styles";

interface BoxProps extends ViewProps, ContainerProps {
  children: React.ReactNode;
}

export const Box: FC<BoxProps> = (props) => {
  const { children, ...rest } = props;
  return <Styled.Container {...rest}>{children}</Styled.Container>;
};
