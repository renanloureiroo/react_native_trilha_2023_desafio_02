import { FC } from "react";
import { ScrollViewProps, ViewProps, ViewStyle } from "react-native";
import * as Styled from "./styles";

import type { ContainerProps } from "./styles";

type ScrollContainerProps = ScrollViewProps & ContainerProps;
type ViewContainerProps = ViewProps & ContainerProps;

export type BoxProps = ContainerProps &
  ViewProps &
  ScrollViewProps & {
    children?: React.ReactNode;
    scroll?: boolean;
  };

export const Box: FC<BoxProps> = (props) => {
  const { children, scroll = false, ...rest } = props;

  if (scroll) {
    return (
      <Styled.ScrollContainer {...(rest as ScrollContainerProps)}>
        {children}
      </Styled.ScrollContainer>
    );
  }
  return (
    <Styled.Container {...(rest as ViewContainerProps)}>
      {children}
    </Styled.Container>
  );
};
