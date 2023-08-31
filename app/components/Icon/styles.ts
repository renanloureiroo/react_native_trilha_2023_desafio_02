import { Image } from "react-native";
import { css, styled } from "styled-components/native";

interface ImageIconProps {
  size: number;
}

export const ImageIcon = styled(Image).attrs<ImageIconProps>({
  style: {
    resizeMode: "contain",
  },
})`
  ${({ size }) => css`
    width: ${size}px;
    height: ${size}px;
  `}
`;
