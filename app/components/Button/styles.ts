import { css, styled } from "styled-components/native";
import { theme } from "../../shared/theme";
import { Pressable } from "react-native";
import { Text } from "../Text";
import { Box } from "../Box";
type Variant = "fill" | "outline";

interface RootProps {
  fullWidth: boolean;
}

interface ButtonProps {
  fullWidth: boolean;
  pressed: boolean;
  variant: Variant;
}

interface ButtonLabelProps {
  variant: Variant;
}

export const Root = styled(Pressable).attrs<RootProps>({})`
  ${({ fullWidth }) => css`
    border-radius: 6px;
    overflow: hidden;
    width: ${fullWidth ? "100%" : "auto"};
  `}
`;

export const Container = styled(Box)<ButtonProps>`
  ${({ theme, fullWidth, pressed, variant }) => css`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: ${theme.spacing[3]}px;
    padding: ${theme.spacing[4]}px ${theme.spacing[6]}px;
    width: ${fullWidth ? "100%" : "auto"};
    min-width: 114px;
    height: 50px;
    border-radius: 6px;
    background-color: ${pressed
      ? variant === "fill"
        ? theme.colors["neutral-100"]
        : theme.colors["neutral-500"]
      : variant === "fill"
      ? theme.colors["neutral-200"]
      : "transparent"};

    border-width: 1px;
    border-color: ${variant === "outline"
      ? theme.colors["neutral-100"]
      : "transparent"};
  `}
`;

export const Label = styled(Text)<ButtonLabelProps>`
  ${({ theme, variant }) => css`
    color: ${variant === "fill"
      ? theme.colors["neutral-900"]
      : theme.colors["neutral-100"]};
  `}
`;
