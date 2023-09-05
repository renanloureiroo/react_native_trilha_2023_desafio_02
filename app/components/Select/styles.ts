import { css, styled } from "styled-components/native";
import { Text } from "../Text";

import Animated from "react-native-reanimated";

interface RootProps {
  selected: boolean;
  type: "primary" | "secondary";
}

interface BalletProps {
  type: "primary" | "secondary";
}

export const Root = styled.Pressable<RootProps>`
  ${({ theme, selected, type }) => css`
    padding: 1px;
    min-height: 50px;
    width: 159px;
    background-color: ${theme.colors["neutral-600"]};
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
  `}
`;

export const Content = styled.View<RootProps>`
  ${({ theme, selected }) => css`
    flex: 1;
    width: 157px;
    height: 48px;
    background-color: ${theme.colors["neutral-600"]};
    justify-content: center;
    align-items: center;
    padding: ${theme.spacing["4"]}px;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    z-index: 1;
  `}
`;

export const Ballet = styled.View<BalletProps>`
  ${({ theme, type }) => css`
    width: 8px;
    height: 8px;
    border-radius: 9999px;
    background-color: ${theme.colors[
      type === "primary" ? "primary-300" : "secondary-300"
    ]};
  `}
`;

export const WaveEffect = styled(Animated.View)`
  position: absolute;
  border-radius: 9999px;
`;

export const Label = styled(Text)`
  z-index: 10;
`;
