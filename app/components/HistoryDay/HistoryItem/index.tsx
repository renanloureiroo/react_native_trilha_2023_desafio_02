import { FC } from "react";
import { Box } from "../../Box";

import * as Styled from "./styles";
import { Text } from "../../Text";
import { PressableProps } from "react-native";

interface HistoryItemProps extends PressableProps {
  data: {
    hour: string;
    name: string;
    isPositive?: boolean;
  };
}

export const HistoryItem: FC<HistoryItemProps> = (props) => {
  const {
    data: { hour, name, isPositive = false },
    onPress,
    ...rest
  } = props;
  return (
    <Styled.Root
      style={({ pressed }) => {
        return {
          opacity: pressed ? 0.5 : 1,
        };
      }}
      {...rest}
      onPress={onPress}
    >
      <Text text={hour} />
      <Styled.Divider />

      <Styled.Title text={name} color="neutral-200" size="x-md" />

      <Styled.CategoryIndicator isPositive={isPositive} />
    </Styled.Root>
  );
};
