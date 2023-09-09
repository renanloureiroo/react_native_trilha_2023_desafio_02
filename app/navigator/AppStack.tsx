import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens";
import { useTheme } from "styled-components/native";
import { NavigatorScreenParams } from "@react-navigation/native";
import { RegisterStack, RegisterStackParamList } from "./RegisterStack";
import { useRegistersContext } from "../shared/hooks/useRegistersContext";
import { StatisticsScreen } from "../screens/Statitics";

export type AppStackParamList = {
  Home: undefined;
  Statistics: undefined;
  ResgisterStack: NavigatorScreenParams<RegisterStackParamList>;
};

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
  const { colors } = useTheme();
  const { hydrated } = useRegistersContext();

  if (!hydrated) return null;

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors["neutral-900"],
        },
      }}
    >
      <Screen name="Home" component={HomeScreen} />
      <Screen name="ResgisterStack" component={RegisterStack} />
      <Screen name="Statistics" component={StatisticsScreen} />
    </Navigator>
  );
};
