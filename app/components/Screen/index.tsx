import { ScrollViewProps, Platform } from "react-native";
import { Box, BoxProps } from "../Box";
import { useSafeArea } from "../../shared/hooks/useSafeArea";
import { Theme } from "../../shared/theme";

import * as Styled from "./styles";
import { StatusBar } from "expo-status-bar";

interface ScreenProps extends BoxProps, ScrollViewProps {
  scroll?: boolean;
  backgroundColor?: keyof Theme["colors"];
  safeAreaEdges?: Array<"top" | "bottom" | "left" | "right">;
  statusBarStyle?: "light" | "dark";
}

export const Screen = (props: ScreenProps) => {
  const {
    scroll = false,
    children,
    safeAreaEdges = ["top"],
    statusBarStyle = "dark",
    ...rest
  } = props;
  const isIos = Platform.OS === "ios";
  const safeAreas = useSafeArea();
  const safeAreaStyle = safeAreaEdges.reduce(
    (acc, edge) => {
      const edgeValue = safeAreas[edge];
      if (edgeValue) {
        // @ts-ignore
        acc[`padding${edge[0].toUpperCase()}${edge.slice(1)}`] = edgeValue;
      }
      return acc;
    },
    {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
    }
  );

  return (
    <Styled.Root style={[safeAreaStyle]}>
      <Styled.Keyboard behavior={isIos ? "padding" : undefined}>
        <StatusBar
          style={statusBarStyle}
          backgroundColor="transparent"
          translucent
          animated
        />
        <Box
          scroll={scroll}
          keyboardShouldPersistTaps="handled"
          scrollEnabled
          {...rest}
          style={{
            flex: 1,
          }}
        >
          {children}
        </Box>
      </Styled.Keyboard>
    </Styled.Root>
  );
};
