import React, { FC } from "react";
import { TextProps as RNTextProps } from "react-native";
import { Theme } from "../../shared/theme";

import * as Styled from "./styles";

interface TextProps extends RNTextProps {
  color?: keyof Theme["colors"];
  weight?: keyof Theme["typography"]["primary"];
  size?: keyof Theme["typography"]["fontSizes"];
  align?: "left" | "center" | "right";
  uppercase?: boolean;
  text?: string;
}

export const Text: FC<TextProps> = (props) => {
  const {
    color = "neutral-100",
    weight = "regular",
    size = "md",
    align = "left",
    uppercase = false,
    text,
    children,
    ...rest
  } = props;

  return (
    <Styled.Text
      color={color}
      weight={weight}
      size={size}
      align={align}
      uppercase={uppercase}
      {...rest}
    >
      {text ?? children}
    </Styled.Text>
  );
};
