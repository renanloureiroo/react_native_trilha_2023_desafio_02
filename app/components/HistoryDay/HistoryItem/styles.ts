import { css, styled } from "styled-components/native";
import { Box } from "../../Box";
import { Text } from "../../Text";
import { Pressable } from "react-native";

interface CategoryIndicatorProps {
  isPositive: boolean;
}

export const Root = styled.Pressable`
  ${({ theme }) => css`
    height: 49px;
    border-radius: 6px;
    border-width: 1px;
    border-color: ${theme.colors["neutral-500"]};
    flex-direction: row;
    gap: ${theme.spacing[3]}px;
    align-items: center;
    width: 100%;
    padding: ${theme.spacing[3]}px;
    position: relative;
  `}
`;

export const Divider = styled.View`
  height: 16px;
  width: 1px;

  ${({ theme }) => css`
    background-color: ${theme.colors["neutral-400"]};
  `}
`;

export const Title = styled(Text)`
  flex: 1;
`;

export const CategoryIndicator = styled.View<CategoryIndicatorProps>`
  width: 14px;
  height: 14px;
  border-radius: 9999px;

  ${({ theme, isPositive }) => css`
    background-color: ${isPositive
      ? theme.colors["primary-200"]
      : theme.colors["secondary-200"]};
  `}
`;
