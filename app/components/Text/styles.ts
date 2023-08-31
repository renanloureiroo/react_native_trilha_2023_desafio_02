import { styled, css } from "styled-components/native";
import { Theme } from "../../shared/theme";

interface TextProps {
  color: keyof Theme["colors"];
  weight: keyof Theme["typography"]["primary"];
  size: keyof Theme["typography"]["fontSizes"];
  align: "left" | "center" | "right";
  uppercase: boolean;
}

export const Text = styled.Text<TextProps>`
  ${({ theme, color, weight, size, align, uppercase }) => css`
    color: ${theme.colors[color]};
    font-family: ${theme.typography.primary[weight]};
    font-size: ${theme.typography.fontSizes[size]};
    text-align: ${align};
    text-transform: ${uppercase ? "uppercase" : "none"};
    line-height: ${Number(theme.typography.fontSizes[size].replace("px", "")) *
    1.3}px;
  `}
`;
