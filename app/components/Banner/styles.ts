import { css, styled } from "styled-components/native";
import { Box } from "../Box";
import { Icon } from "../Icon";

interface RootProps {
  isPositive: boolean;
}

export const Root = styled(Box)<RootProps>`
  ${({ theme, isPositive }) => css`
    background-color: ${isPositive
      ? theme.colors["primary-100"]
      : theme.colors["secondary-100"]};
    border-radius: 8px;
    position: relative;
  `}
`;

export const Content = styled(Box)`
  ${({ theme }) => css`
    align-items: center;
    justify-content: center;
    padding: 20px 16px;
  `}
`;

export const IconWrapper = styled(Box)`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
`;
