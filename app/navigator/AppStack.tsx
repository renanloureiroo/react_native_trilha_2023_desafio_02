import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens";
import { useTheme } from "styled-components/native";
import {
  NavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { RegisterStack, RegisterStackParamList } from "./RegisterStack";

export type AppStackParamList = {
  Home: undefined;
  ResgisterStack: NavigatorScreenParams<RegisterStackParamList>;
};

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
  const { colors } = useTheme();
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
    </Navigator>
  );
};
