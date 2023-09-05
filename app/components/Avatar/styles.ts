import { css, styled } from "styled-components/native";
import { Box } from "../Box";

export const Root = styled(Box)`
  ${({ theme }) => css`
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    border: 2px solid ${theme.colors["neutral-100"]};
  `}
`;

export const Photo = styled.Image``;
