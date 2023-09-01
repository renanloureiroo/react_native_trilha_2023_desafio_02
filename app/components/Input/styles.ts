import { css, styled } from "styled-components/native";
import { Box, Text } from "../";
import { TextInput } from "react-native";

interface ContainerProps {
  isFocused: boolean;
}

export const Root = styled.Pressable``;

export const Label = styled(Text)`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacing[1]}px;
  `}
`;

export const Container = styled(Box)<ContainerProps>`
  ${({ theme, isFocused }) => css`
    padding: 14px;
    border-radius: 6px;
    border-width: 1px;
    border-color: ${theme.colors[isFocused ? "neutral-300" : "neutral-500"]};
    background-color: ${theme.colors["neutral-900"]};
    flex-direction: row;
    align-items: center;
    height: 48px;
  `}
`;

export const Input = styled(TextInput)`
  background-color: transparent;
  flex: 1;
  padding: 0px;

  ${({ theme }) => css`
    font-family: ${theme.typography.primary.regular};
    font-size: ${theme.typography.fontSizes["x-md"]};
    line-height: 16px;
    height: 16px;
  `}
`;
