import { css, styled } from "styled-components/native";
import { theme } from "../../shared/theme";
import { Pressable } from "react-native";
import { Text } from "../Text";
type Variant = "fill" | "outline";

interface ButtonProps {
  fullWidth: boolean;
  pressed: boolean;
  variant: Variant;
}

interface ButtonLabelProps {
  variant: Variant;
}

export const Root = styled(Pressable).attrs({
  android_ripple: {
    color: "rbga(0,0,0,0.2)",
    foreground: true,
  },
})`
  ${() => css`
    border-radius: 6px;
    overflow: hidden;
  `}
`;

export const Container = styled.View<ButtonProps>`
  ${({ theme, fullWidth, pressed, variant }) => css`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: ${theme.spacing[3]}px;
    padding: ${theme.spacing[4]}px ${theme.spacing[6]}px;
    width: ${fullWidth ? "100%" : "auto"};
    min-width: 114px;
    min-height: 50px;
    border-radius: 6px;
    background-color: ${pressed
      ? variant === "fill"
        ? theme.colors["neutral-100"]
        : theme.colors["neutral-500"]
      : variant === "fill"
      ? theme.colors["neutral-200"]
      : "transparent"};

    border: ${variant === "outline"
      ? `1px solid ${theme.colors["neutral-100"]}`
      : "none"};
  `}
`;

export const Label = styled(Text)<ButtonLabelProps>`
  ${({ theme, variant }) => css`
    color: ${variant === "fill"
      ? theme.colors["neutral-900"]
      : theme.colors["neutral-100"]};
  `}
`;
