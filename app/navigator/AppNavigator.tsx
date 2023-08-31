import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./AppStack";
import { useFonts } from "../shared/hooks/useFonts";

import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../shared/theme";

export const AppNavigator = () => {
  const fontsLoaded = useFonts({
    hideSplashScreen: SplashScreen.hideAsync,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </ThemeProvider>
  );
};
