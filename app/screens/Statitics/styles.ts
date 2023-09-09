import styled, { css } from "styled-components/native";
import { Box, Text } from "../../components";

export const Card = styled(Box)`
  ${({ theme }) => css`
    padding: ${theme.spacing[4]}px;
    border-radius: 8px;
    gap: 4px;
    align-items: center;
    justify-content: center;
  `};
`;

export const Title = styled(Text).attrs({
  size: "x-lg",
  weight: "bold",
  color: "neutral-100",
})`
  text-align: center;
`;

export const Subtitle = styled(Text).attrs({
  size: "md",
  color: "neutral-200",
})`
  text-align: center;
`;
