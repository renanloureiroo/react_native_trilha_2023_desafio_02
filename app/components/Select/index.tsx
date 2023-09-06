import { FC, useEffect, useState } from "react";
import * as Styled from "./styles";

import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "styled-components/native";
import { theme } from "../../shared/theme";
import { Box } from "../Box";

interface SelectProps {
  type?: "primary" | "secondary";
  selected?: boolean;
  option: {
    value: string;
    label: string;
    id: string;
  };
  onPress?: () => void;
}

export const Select: FC<SelectProps> = (props) => {
  const { selected = false, option, type = "primary", onPress } = props;

  const size = useSharedValue(0);
  const top = useSharedValue(0);
  const left = useSharedValue(0);

  const { colors, timing } = useTheme();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: size.value,
      height: size.value,
      top: top.value,
      left: left.value,
      backgroundColor:
        type === "primary" ? colors["primary-100"] : colors["secondary-100"],
    };
  }, []);

  const animatedStylesBG = useAnimatedStyle(() => {
    return {
      width: size.value,
      height: size.value,
      top: top.value,
      left: left.value,
      backgroundColor:
        type === "primary" ? colors["primary-300"] : colors["secondary-300"],
    };
  });

  const animationConfig = {
    duration: timing.quick,
    easing: Easing.quad,
  };

  useEffect(() => {
    if (selected) {
      size.value = withTiming(400, animationConfig);
      top.value = withTiming(-200, animationConfig);
      left.value = withTiming(-200, animationConfig);
    } else {
      size.value = withTiming(0, animationConfig);
      top.value = withTiming(0, animationConfig);
      left.value = withTiming(0, animationConfig);
    }
  }, [selected]);

  return (
    <Styled.Root type={type} selected={selected} onPress={onPress}>
      <Styled.Content selected={selected} type={type}>
        <Box
          zIndex={1}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap={4}
        >
          <Styled.Ballet type={type} />
          <Styled.Label text={option.label} size="md" weight="bold" />
        </Box>
        <Styled.WaveEffect style={[animatedStyles]} />
      </Styled.Content>
      <Styled.WaveEffect style={[animatedStylesBG]} />
    </Styled.Root>
  );
};
