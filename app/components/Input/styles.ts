import { css, styled } from "styled-components/native";
import { Text } from "../Text";
import { Box } from "../Box";
import { TextInput } from "react-native";

interface ContainerProps {
  isFocused: boolean;
  multiline: boolean;
  multilineHeight: number;
}

export const Root = styled.Pressable``;

export const Label = styled(Text)`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacing[1]}px;
  `}
`;

export const Container = styled(Box)<ContainerProps>`
  ${({ theme, isFocused, multiline, multilineHeight }) => css`
    padding: 14px;
    width: 100%;
    border-radius: 6px;
    border-width: 1px;
    border-color: ${theme.colors[isFocused ? "neutral-300" : "neutral-500"]};
    background-color: ${theme.colors["neutral-900"]};
    flex-direction: row;
    align-items: ${multiline ? "flex-start" : "center"};
    height: ${multiline ? multilineHeight : 48}px;
    min-height: ${multiline ? multilineHeight : 48}px;
  `}
`;

export const InputField = styled(TextInput)`
  background-color: transparent;
  flex: 1;
  padding: 0px;

  ${({ theme }) => css`
    font-family: ${theme.typography.primary.regular};
    font-size: ${theme.typography.fontSizes["x-md"]};
    vertical-align: middle;
  `}
`;
