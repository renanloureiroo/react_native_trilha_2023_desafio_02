import * as SplashScreen from "expo-splash-screen";

import { AppNavigator } from "./app/navigator/AppNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return <AppNavigator />;
}
