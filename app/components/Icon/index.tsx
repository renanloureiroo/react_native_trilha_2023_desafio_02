import { ImageProps } from "react-native";

import * as Styled from "./styles";
import { Theme } from "../../shared/theme";
import { FC } from "react";
import { useTheme } from "styled-components/native";

export type Icons = keyof typeof icons;

interface IconProps extends Omit<ImageProps, "source"> {
  name?: Icons;
  color?: keyof Theme["colors"];
  size?: number;
}

export const Icon: FC<IconProps> = (props) => {
  const {
    name = "arrow-left",
    size = 24,
    color,
    style: $overrideStyles,
    ...rest
  } = props;

  const { colors } = useTheme();
  return (
    <Styled.ImageIcon
      {...rest}
      style={[
        { ...(!!color && { tintColor: colors[color] }) },
        $overrideStyles,
      ]}
      size={size}
      source={icons[name]}
    />
  );
};

export const icons = {
  "arrow-left": require("../../../assets/icons/arrow-left.png"),
  "arrow-up-right": require("../../../assets/icons/arrow-up-right.png"),
  "pincel-simple-line": require("../../../assets/icons/pencil-simple-line.png"),
  plus: require("../../../assets/icons/plus.png"),
  trash: require("../../../assets/icons/trash.png"),
};
