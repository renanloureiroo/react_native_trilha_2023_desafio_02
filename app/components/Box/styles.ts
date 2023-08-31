import { ViewStyle } from "react-native";
import { css, styled } from "styled-components/native";
import { Theme } from "../../shared/theme";

export interface ContainerProps
  extends Omit<ViewStyle, "borderColor" | "backgroundColor"> {
  borderColor?: keyof Theme["colors"];
  bg?: keyof Theme["colors"];
}

export const Container = styled.View<ContainerProps>`
  ${({ bg, borderColor, theme }) => css`
    background-color: ${bg ? theme.colors[bg] : "transparent"};

    border-color: ${borderColor ? theme.colors[borderColor] : "transparent"};
  `}
`;
