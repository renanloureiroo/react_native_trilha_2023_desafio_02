import { css, styled } from "styled-components/native";
import { Box } from "../Box";

interface RootProps {
  variant: "default" | "home";
}

export const Root = styled(Box)<RootProps>`
  width: 100%;
  height: 40px;
  flex-direction: row;
  align-items: center;
  position: relative;
  ${({ variant }) => css`
    justify-content: ${variant === "home" ? "space-between" : "center"};
  `}
`;
