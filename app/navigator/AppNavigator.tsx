import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./AppStack";
import { useFonts } from "../shared/hooks/useFonts";

import * as SplashScreen from "expo-splash-screen";

import { AppProviders } from "../providers/AppProvider";

export const AppNavigator = () => {
  const fontsLoaded = useFonts({
    hideSplashScreen: SplashScreen.hideAsync,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppProviders>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </AppProviders>
  );
};
