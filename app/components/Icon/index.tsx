import { ImageProps, Pressable } from "react-native";

import * as Styled from "./styles";
import { Theme } from "../../shared/theme";
import { FC } from "react";
import { useTheme } from "styled-components/native";

export type Icons = keyof typeof icons;

interface IconProps extends Omit<ImageProps, "source" | "onPress"> {
  name?: Icons;
  color?: keyof Theme["colors"];
  androidRippleColor?: keyof Theme["colors"];
  size?: number;
  width?: number;
  height?: number;
  onPressAction?: () => void;
}

export const Icon: FC<IconProps> = (props) => {
  const {
    name = "arrow-left",
    size = 24,
    color,
    androidRippleColor = "neutral-500",
    style: $overrideStyles,
    width,
    height,
    onPressAction,
    ...rest
  } = props;

  const { colors } = useTheme();

  if (onPressAction) {
    return (
      <Pressable
        onPress={onPressAction}
        android_ripple={{
          color: colors[androidRippleColor],
          borderless: true,
          foreground: true,
        }}
      >
        {({ pressed }: { pressed: boolean }) => (
          <Styled.ImageIcon
            {...rest}
            style={[
              {
                ...(!!color && { tintColor: colors[color] }),
                opacity: pressed ? 0.5 : 1,
              },
              $overrideStyles,
            ]}
            resizeMode="contain"
            width={width || size}
            height={height || size}
            source={icons[name]}
          />
        )}
      </Pressable>
    );
  }
  return (
    <Styled.ImageIcon
      {...rest}
      style={[
        { ...(!!color && { tintColor: colors[color] }) },
        $overrideStyles,
      ]}
      resizeMode="contain"
      width={width || size}
      height={height || size}
      source={icons[name]}
    />
  );
};

export const icons = {
  logo: require("../../../assets/icons/logo.png"),
  "arrow-left": require("../../../assets/icons/arrow-left.png"),
  "arrow-up-right": require("../../../assets/icons/arrow-up-right.png"),
  "pincel-simple-line": require("../../../assets/icons/pencil-simple-line.png"),
  plus: require("../../../assets/icons/plus.png"),
  trash: require("../../../assets/icons/trash.png"),
};
